import TreeBuilder from './builder.js';
import _ from "lodash";
const d3 =  require("d3");

const dTree = {

  VERSION: '/* @echo DTREE_VERSION */',

  init: function(data, options = {}) {

    var opts = _.defaultsDeep(options || {}, {
      target: '#graph',
      debug: false,
      width: 600,
      height: 600,
      callbacks: {
        nodeClick: function() {},
        nodeRightClick: function() {},
        nodeHeightSeperation: function(nodeWidth, nodeMaxHeight) {
          return TreeBuilder._nodeHeightSeperation(nodeWidth, nodeMaxHeight);
        },
        nodeRenderer: function(name, x, y, height, width, extra, id, nodeClass, textClass, textRenderer) {
          return TreeBuilder._nodeRenderer(name, x, y, height, width, extra,
            id,nodeClass, textClass, textRenderer);
        },
        nodeSize: function(nodes, width, textRenderer) {
          return TreeBuilder._nodeSize(nodes, width, textRenderer);
        },
        nodeSorter: function() {return 0;},
        textRenderer: function(name, extra, textClass) {
          return TreeBuilder._textRenderer(name, extra, textClass);
        },
      },
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      nodeWidth: 100,
      styles: {
        node: 'node',
        linage: 'linage',
        marriage: 'marriage',
        text: 'nodeText'
      }
    });

    data = this._preprocess(data, opts);
    var treeBuilder = new TreeBuilder(data, opts);
    treeBuilder.create();

  },

  _preprocess: function(data, opts) {

    var siblings = [];
    var id = 0;

    var root = {
      name: '',
      id: id++,
      hidden: true,
      children: [],
    };

    var reconstructTree = function(person, parent) {

      // convert to person to d3 node
      var node = {
        name: person.name,
        id: id++,
        hidden: false,
        children: [],
        parents: [],
        extra: person.extra,
        isParent: !!person.isParent,
        textClass: person.textClass ? person.textClass : opts.styles.text,
        class: person.class ? person.class : opts.styles.node
      };

      // hide linages to the hidden root node
      if (parent == root) {
        node.noParent = true;
      }

      // apply depth offset
      for (var i = 0; i < person.depthOffset; i++) {
        var pushNode = {
          name: '',
          id: id++,
          hidden: true,
          children: [],
          noParent: node.noParent,
          isParent: node.isParent
        };
        parent.children.push(pushNode);
        parent = pushNode;
      }

      // sort children
      dTree._sortPersons(person.children, opts);

      // add "direct" children
      _.forEach(person.children, function(child) {
        reconstructTree(child, node);
      });

      if (person.parents){

        // reconstruct parents
        var p1 = person.parents[0];
        if (p1)
          p1.isParent = true;

        var p2 = person.parents[1];
        if (p2)
          p2.isParent = true;

        var m = {
          name: '',
          id: id++,
          hidden: true,
          noParent: false,
          isParent: true,
          children: [],
          parents: [],
          extra: null
        };

        if (p1) {
          var p1result = reconstructTree(p1, node);
        }

        if (p1 && p2) {
          node.parents.push(m);
        }

        if (p2){
          var p2result = reconstructTree(p2, node);
          p2result.marriageNode = m;
        }

        if (p1 && p2) {

          p1result.noParent = true;
          p2result.noParent = true;
          siblings.push({
            source: {
              id: p1result.id
            },
            target: {
              id: p2result.id
            },
            number: 0
          });
        }
      }

      if (!node.isParent)
        parent.children.push(node);
      else
        parent.parents.push(node)

      //sort marriages
      dTree._sortMarriages(person.marriages, opts);

      // go through marriage
      _.forEach(person.marriages, function(marriage, index) {

        var m = {
          name: '',
          id: id++,
          hidden: true,
          noParent: true,
          children: [],
          extra: marriage.extra
        };

        parent.children.push(m);

        var sp = marriage.spouse;
        var spouse = reconstructTree(sp, parent);
        spouse.marriageNode = m;
        spouse.noParent = true;

        dTree._sortPersons(marriage.children, opts);
        _.forEach(marriage.children, function(child) {
          reconstructTree(child, m);
        });

        siblings.push({
          source: {
            id: node.id
          },
          target: {
            id: spouse.id
          },
          number: index
        });
      });

      if (parent == root) {
        parent.parents = _.clone(parent.children);
      }

      return node;
    };

    _.forEach(data, function(person) {
      reconstructTree(person, root);
    });

    return {
      root: d3.hierarchy(root, function(d) { return d.children }),
      parents: d3.hierarchy(root, function(d) { return d.parents }),
      siblings: siblings
    };

  },

  _sortPersons: function(persons, opts) {
    if (persons != undefined) {
      persons.sort(function(a, b) {
        return opts.callbacks.nodeSorter(a.name, a.extra, b.name, b.extra);
      });
    }
    return persons;
  },

  _sortMarriages: function(marriages, opts) {
    if (marriages != undefined && Array.isArray(marriages)) {
      marriages.sort(function(marriageA, marriageB) {
        var a = marriageA.spouse;
        var b = marriageB.spouse;
        return opts.callbacks.nodeSorter(a.name, a.extra, b.name, b.extra);
      });
    }
    return marriages;
  }

};

export default dTree;
