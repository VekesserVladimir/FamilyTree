// const d3 =  require("d3");
import dTree from "../dTree/dTree";
import _ from "lodash";

export default function buildTree(relation) {
		dTree.init(relation,
			{
				target: "#graph",
				debug: true,
				height: 800,
				width: 800,
				nodeWidth: 250,
				callbacks: {
				nodeClick: function (name) {
					alert('Click: ' + name);
				},
				nodeRightClick: function (name) {
					alert('Right-click: ' + name);
				},
				nodeSize: function (nodes, width, textRenderer) {
					// width = width;
					//var maxWidth = 0;
					var maxHeight = 0;	
					var tmpSvg = document.createElement('svg');
					document.body.appendChild(tmpSvg);

					_.map(nodes, function (n) {
						var container = document.createElement('div');
						container.setAttribute('class', 'node ' + n.data['class']);
						container.style.visibility = 'hidden';
						container.style.maxWidth = width + 'px';

						var text = textRenderer(n.data.name, n.data.extra, n.data.textClass);
						container.innerHTML = text;

						tmpSvg.appendChild(container);
						var height = container.offsetHeight + 10;
						tmpSvg.removeChild(container);
						maxHeight = Math.max(maxHeight, height);
						console.log(container, height, maxHeight);
						n.cHeight = maxHeight;
						if (n.data.hidden) {
							n.cWidth = 0;
						} else {
							n.cWidth = width;
						}
					});
					document.body.removeChild(tmpSvg);

					return [width + 10, maxHeight];
				},
				textRenderer: function (name, extra, textClass) {
					var result = "<div style='margin: 5px'><h2 class='" + textClass + "'>" + name + "</h2>";
					if (extra && extra.Birthday)
						result += "<p>" + extra.Birthday + "-" + extra.Death + "</p>";
					result += "</div>"
					return result;
				},
				nodeRenderer: function (name, x, y, height, width, extra, id, nodeClass, textClass, textRenderer) {
					var node = '';
					node += '<div ';
					// node += 'style="height:100%;width:100%;" ';
					node += 'class="node" ';
					node += 'id="node' + id + '">\n';
					node += "<img src='/media/raw/" + (extra ? extra.Photo : "") + "'>"
					node += textRenderer(name, extra, textClass);
					node += '</div>';
					return node;
				}
			}
		});
}