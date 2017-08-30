function getGraphDataSets() {

    const sa = function(Graph) {
        qwest.get('sa.json').then((_, data) => {
            data.nodes.forEach(node => { node.name = `${node.user?node.user+': ':''}${node.description || node.id}` });

            Graph
                .cooldownTicks(300)
                .cooldownTime(20000)
                .autoColorBy('group')
                .forceEngine('ngraph')
                .graphData(data);
        });
    };
    sa.description = "<em>Support Automation</em> data ";

    //

    const tunnel = function(Graph) {

        const perimeter = 12, length = 30;

        const getId = (col, row) => `${col},${row}`;

        let nodes = [], links = [];
        for (let colIdx=0; colIdx<perimeter; colIdx++) {
            for (let rowIdx=0; rowIdx<length; rowIdx++) {
                const id = getId(colIdx, rowIdx);
                nodes.push({id});

                // Link vertically
                if (rowIdx>0) {
                    links.push({ source: getId(colIdx, rowIdx-1), target: id });
                }

                // Link horizontally
                links.push({ source: getId((colIdx || perimeter) - 1, rowIdx), target: id });
            }
        }

        Graph
            .cooldownTicks(300)
            .forceEngine('ngraph')
            .graphData({ nodes: nodes, links: links });
    };
    tunnel.description = "fabric data for a cylindrical tunnel shape";

    //

    return [sa, tunnel];
}
