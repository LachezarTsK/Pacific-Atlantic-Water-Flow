
/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function (heights) {
    if (heights === null | heights.length === 0 || heights[0].length === 0) {
        return [];
    }

    this.moves = [[-1, 0]/*up*/, [1, 0]/*down*/, [0, -1]/*left*/, [0, 1]/*right*/];
    this.rows = heights.length;
    this.columns = heights[0].length;

    this.flowToPacific = new Array(this.rows);
    this.flowToAtlantic = new Array(this.rows);
    for (let r = 0; r < this.rows; r++) {
        this.flowToPacific[r] = new Array(this.columns).fill(false);
        this.flowToAtlantic[r] = new Array(this.columns).fill(false);
    }
    mapWaterFlow(heights);

    return findPointsFlowingToBothPacificAndAtlanticOceans();
};

/**
 * @return {number[][]}
 */
function findPointsFlowingToBothPacificAndAtlanticOceans() {
    const flowToBothPacificAndAtlanticOceans = [];
    for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.columns; c++) {
            if (this.flowToPacific[r][c] && this.flowToAtlantic[r][c]) {
                flowToBothPacificAndAtlanticOceans.push([r, c]);
            }
        }
    }
    return flowToBothPacificAndAtlanticOceans;
}

/**
 * @param {number[][]} heights
 */
function mapWaterFlow(heights) {
    for (let r = 0; r < this.rows; r++) {
        depthFirstSearch(heights, this.flowToPacific, r, 0);
        depthFirstSearch(heights, this.flowToAtlantic, r, this.columns - 1);
    }
    for (let c = 0; c < this.columns; c++) {
        depthFirstSearch(heights, this.flowToPacific, 0, c);
        depthFirstSearch(heights, this.flowToAtlantic, this.rows - 1, c);
    }
}

/**
 * @param {number[][]} heights
 * @param {boolean[][]} waterFlow
 * @param {number} row
 * @param {number} column  
 */
function depthFirstSearch(heights, waterFlow, row, column) {
    waterFlow[row][column] = true;
    for (let i = 0; i < this.moves.length; i++) {
        let r = row + moves[i][0];
        let c = column + moves[i][1];
        if (pointIsInGrid(r, c) && !waterFlow[r][c] && heights[r][c] >= heights[row][column]) {
            depthFirstSearch(heights, waterFlow, r, c);
        }
    }
}

/**
 * @param {number} r
 * @param {number} c
 * @return {boolean} 
 */
function pointIsInGrid(r, c) {
    return r >= 0 && r < this.rows && c >= 0 && c < this.columns;
}
