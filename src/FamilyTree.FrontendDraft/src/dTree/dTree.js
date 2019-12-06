import _ from "lodash";
const d3 =  require("d3");


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (window, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : global.dTree = factory();
})(this, function () {
  'use strict';

  var TreeBuilder = (function () {
    function TreeBuilder(treeData, opts) {
      _classCallCheck(this, TreeBuilder);

      TreeBuilder.DEBUG_LEVEL = opts.debug ? 1 : 0;

      this.root = treeData.root;
      this.siblings = treeData.siblings;
      this.parents = treeData.parents;
      this.opts = opts;

      // flatten nodes
      this.allNodes = this._flatten(this.root);
      this.allNodes = this.allNodes.concat(this._flatten(this.parents));

      // Calculate node size
      var visibleNodes = _.filter(this.allNodes, function (n) {
        return !n.hidden;
      });
      this.nodeSize = opts.callbacks.nodeSize(visibleNodes, opts.nodeWidth, opts.callbacks.textRenderer);
    }

    _createClass(TreeBuilder, [{
      key: 'create',
      value: function create() {

        var opts = this.opts;
        // var allNodes = this.allNodes;
        var nodeSize = this.nodeSize;

        var width = opts.width + opts.margin.left + opts.margin.right;
        var height = opts.height + opts.margin.top + opts.margin.bottom;

        var zoom = d3.zoom().scaleExtent([0.1, 10]).on('zoom', function () {
          svg.attr('transform', d3.event.transform.translate(width / 2, opts.margin.top));
        });

        //make an SVG
        var svg = this.svg = d3.select(opts.target).append('svg').attr('width', width).attr('height', height).call(zoom).append('g').attr('transform', 'translate(' + width / 2 + ',' + opts.margin.top + ')');

        // Compute the layout.
        this.tree = d3.tree().nodeSize([nodeSize[0] * 2, opts.callbacks.nodeHeightSeperation(nodeSize[0], nodeSize[1])]);

        this.inverseTree = d3.tree().nodeSize([nodeSize[0] * 2, opts.callbacks.nodeHeightSeperation(nodeSize[0], nodeSize[1]) * -1]);

        this.tree.separation(function separation(a, b) {
          if (a.data.hidden || b.data.hidden) {
            return 0.3;
          } else {
            return 0.6;
          }
        });

        this.inverseTree.separation(function separation(a, b) {
          if (a.data.hidden || b.data.hidden) {
            return 0.3;
          } else {
            return 0.6;
          }
        });

        this._update();
      }
    }, {
      key: '_update',
      value: function _update() {

        var opts = this.opts;
        // var allNodes = this.allNodes;
        var nodeSize = this.nodeSize;

        var rootNodes = this.tree(this.root);
        var parentNodes = this.inverseTree(this.parents);

        _.zip(rootNodes.children, parentNodes.children).forEach(function (i) {
          if (!i[1].children) return;

          i[0].children = i[0].children ? i[0].children.concat(i[1].children) : i[1].children;

          if (i[1].children) {
            i[1].children.forEach(function (j) {
              j.parent = i[0];
            });
          }
        });

        var links = rootNodes.links();

        // Create the link lines.
        this.svg.selectAll('.link').data(links).enter()
        // filter links with no parents to prevent empty nodes
        .filter(function (l) {
          return !l.target.data.noParent;
        }).append('path').attr('class', opts.styles.linage).attr('d', this._elbow);

        var nodes = this.svg.selectAll('.node').data(rootNodes.descendants()).enter();

        this._linkSiblings();

        // Draw siblings (marriage)
        this.svg.selectAll('.sibling').data(this.siblings).enter().append('path').attr('class', opts.styles.marriage).attr('d', _.bind(this._siblingLine, this));

        // Create the node rectangles.
        nodes.append('foreignObject').filter(function (d) {
          return d.data.hidden ? false : true;
        }).attr('x', function (d) {
          return d.x - d.cWidth / 2 + 'px';
        }).attr('y', function (d) {
          return d.y - d.cHeight / 2 + 'px';
        }).attr('width', function (d) {
          return d.cWidth + 'px';
        }).attr('height', function (d) {
          return d.cHeight + 'px';
        }).attr('id', function (d) {
          return d.id;
        }).html(function (d) {
          return opts.callbacks.nodeRenderer(d.data.name, d.x, d.y, nodeSize[0], nodeSize[1], d.data.extra, d.data.id, d.data['class'], d.data.textClass, opts.callbacks.textRenderer);
        }).on('click', function (d) {
          if (d.data.hidden) {
            return;
          }
          opts.callbacks.nodeClick(d.data.name, d.data.extra, d.data.id);
        }).on('contextmenu', function (d) {
          if (d.data.hidden) {
            return;
          }
          d3.event.preventDefault();
          opts.callbacks.nodeRightClick(d.data.name, d.data.extra, d.data.id);
        });
      }
    }, {
      key: '_flatten',
      value: function _flatten(root) {
        var n = [];
        var i = 0;

        function recurse(node) {
          if (node.children) {
            node.children.forEach(recurse);
          }
          if (!node.id) {
            node.id = ++i;
          }
          n.push(node);
        }
        recurse(root);
        return n;
      }
    }, {
      key: '_elbow',
      value: function _elbow(d) {
        if (d.target.data.noParent) {
          return 'M0,0L0,0';
        }
        var ny = d.target.y + (d.source.y - d.target.y) * 0.50;

        var linedata = [{
          x: d.target.x,
          y: d.target.y
        }, {
          x: d.target.x,
          y: ny
        }, {
          x: d.source.x,
          y: d.source.y
        }];

        var fun = d3.line().curve(d3.curveStepAfter).x(function (d) {
          return d.x;
        }).y(function (d) {
          return d.y;
        });
        return fun(linedata);
      }
    }, {
      key: '_linkSiblings',
      value: function _linkSiblings() {

        var allNodes = this.allNodes;

        _.forEach(this.siblings, function (d) {
          var start = allNodes.filter(function (v) {
            return d.source.id == v.data.id;
          });
          var end = allNodes.filter(function (v) {
            return d.target.id == v.data.id;
          });
          d.source.x = start[0].x;
          d.source.y = start[0].y;
          d.target.x = end[0].x;
          d.target.y = end[0].y;

          var marriageId = start[0].data.marriageNode != null ? start[0].data.marriageNode.id : end[0].data.marriageNode.id;
          var marriageNode = allNodes.find(function (n) {
            return n.data.id == marriageId;
          });
          d.source.marriageNode = marriageNode;
          d.target.marriageNode = marriageNode;
        });
      }
    }, {
      key: '_siblingLine',
      value: function _siblingLine(d) {

        var ny = d.target.y + (d.source.y - d.target.y) * 0.50;
        var nodeWidth = this.nodeSize[0];
        var nodeHeight = this.nodeSize[1];

        // Not first marriage
        if (d.number > 0) {
          ny -= nodeHeight * 8 / 10;
        }

        var linedata = [{
          x: d.source.x,
          y: d.source.y
        }, {
          x: d.source.x + nodeWidth * 6 / 10,
          y: d.source.y
        }, {
          x: d.source.x + nodeWidth * 6 / 10,
          y: ny
        }, {
          x: d.target.marriageNode.x,
          y: ny
        }, {
          x: d.target.marriageNode.x,
          y: d.target.y
        }, {
          x: d.target.x,
          y: d.target.y
        }];

        var fun = d3.line().curve(d3.curveStepAfter).x(function (d) {
          return d.x;
        }).y(function (d) {
          return d.y;
        });
        return fun(linedata);
      }
    }], [{
      key: '_nodeHeightSeperation',
      value: function _nodeHeightSeperation(nodeWidth, nodeMaxHeight) {
        return nodeMaxHeight + 25;
      }
    }, {
      key: '_nodeSize',
      value: function _nodeSize(nodes, width, textRenderer) {
        // var maxWidth = 0;
        var maxHeight = 0;
        var tmpSvg = document.createElement('svg');
        document.body.appendChild(tmpSvg);

        _.map(nodes, function (n) {
          var container = document.createElement('div');
          container.setAttribute('class', n.data['class']);
          container.style.visibility = 'hidden';
          container.style.maxWidth = width + 'px';

          var text = textRenderer(n.data.name, n.data.extra, n.data.textClass);
          container.innerHTML = text;

          tmpSvg.appendChild(container);
          var height = container.offsetHeight;
          tmpSvg.removeChild(container);

          maxHeight = Math.max(maxHeight, height);
          n.cHeight = height;
          if (n.data.hidden) {
            n.cWidth = 0;
          } else {
            n.cWidth = width;
          }
        });
        document.body.removeChild(tmpSvg);

        return [width, maxHeight];
      }
    }, {
      key: '_nodeRenderer',
      value: function _nodeRenderer(name, x, y, height, width, extra, id, nodeClass, textClass, textRenderer) {
        var node = '';
        node += '<div ';
        node += 'style="height:100%;width:100%;" ';
        node += 'class="' + nodeClass + '" ';
        node += 'id="node' + id + '">\n';
        node += textRenderer(name, extra, textClass);
        node += '</div>';
        return node;
      }
    }, {
      key: '_textRenderer',
      value: function _textRenderer(name, extra, textClass) {
        var node = '';
        node += '<p ';
        node += 'align="center" ';
        node += 'class="' + textClass + '">\n';
        node += name;
        node += '</p>\n';
        return node;
      }
    }, {
      key: '_debug',
      value: function _debug(msg) {
        if (TreeBuilder.DEBUG_LEVEL > 0) {
          console.log(msg);
        }
      }
    }]);

    return TreeBuilder;
  })();

  var dTree = {

    VERSION: '2.2.1',

    init: function init(data) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var opts = _.defaultsDeep(options || {}, {
        target: '#graph',
        debug: false,
        width: 600,
        height: 600,
        callbacks: {
          nodeClick: function nodeClick() {},
          nodeRightClick: function nodeRightClick() {},
          nodeHeightSeperation: function nodeHeightSeperation(nodeWidth, nodeMaxHeight) {
            return TreeBuilder._nodeHeightSeperation(nodeWidth, nodeMaxHeight);
          },
          nodeRenderer: function nodeRenderer(name, x, y, height, width, extra, id, nodeClass, textClass, textRenderer) {
            return TreeBuilder._nodeRenderer(name, x, y, height, width, extra, id, nodeClass, textClass, textRenderer);
          },
          nodeSize: function nodeSize(nodes, width, textRenderer) {
            return TreeBuilder._nodeSize(nodes, width, textRenderer);
          },
          nodeSorter: function nodeSorter() {
            return 0;
          },
          textRenderer: function textRenderer(name, extra, textClass) {
            return TreeBuilder._textRenderer(name, extra, textClass);
          }
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

    _preprocess: function _preprocess(data, opts) {

      var siblings = [];
      var id = 0;

      var root = {
        name: '',
        id: id++,
        hidden: true,
        children: []
      };

      var reconstructTree = function reconstructTree(person, parent) {

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
          'class': person['class'] ? person['class'] : opts.styles.node
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
        _.forEach(person.children, function (child) {
          reconstructTree(child, node);
        });

        if (person.parents) {

          // reconstruct parents
          var p1 = person.parents[0];
          if (p1) p1.isParent = true;

          var p2 = person.parents[1];
          if (p2) p2.isParent = true;

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

          if (p2) {
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

        if (!node.isParent) parent.children.push(node);else parent.parents.push(node);

        //sort marriages
        dTree._sortMarriages(person.marriages, opts);

        // go through marriage
        _.forEach(person.marriages, function (marriage, index) {

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
          _.forEach(marriage.children, function (child) {
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

      _.forEach(data, function (person) {
        reconstructTree(person, root);
      });

      return {
        root: d3.hierarchy(root, function (d) {
          return d.children;
        }),
        parents: d3.hierarchy(root, function (d) {
          return d.parents;
        }),
        siblings: siblings
      };
    },

    _sortPersons: function _sortPersons(persons, opts) {
      if (persons != undefined) {
        persons.sort(function (a, b) {
          return opts.callbacks.nodeSorter(a.name, a.extra, b.name, b.extra);
        });
      }
      return persons;
    },

    _sortMarriages: function _sortMarriages(marriages, opts) {
      if (marriages != undefined && Array.isArray(marriages)) {
        marriages.sort(function (marriageA, marriageB) {
          var a = marriageA.spouse;
          var b = marriageB.spouse;
          return opts.callbacks.nodeSorter(a.name, a.extra, b.name, b.extra);
        });
      }
      return marriages;
    }

  };

  return dTree;
});
//# sourceMappingURL=dTree.js.map
