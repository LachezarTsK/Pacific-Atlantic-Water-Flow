
import java.util.ArrayList;
import java.util.List;

public class Solution {

    private static final int[][] moves = {{-1, 0}/*up*/, {1, 0}/*down*/, {0, -1}/*left*/, {0, 1}/*right*/};
    private boolean[][] flowToPacific;
    private boolean[][] flowToAtlantic;
    private int rows;
    private int columns;

    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        if (heights == null | heights.length == 0 || heights[0].length == 0) {
            return new ArrayList<>();
        }

        rows = heights.length;
        columns = heights[0].length;
        flowToPacific = new boolean[rows][columns];
        flowToAtlantic = new boolean[rows][columns];
        mapWaterFlow(heights);

        return findPointsFlowingToBothPacificAndAtlanticOceans();
    }

    private List<List<Integer>> findPointsFlowingToBothPacificAndAtlanticOceans() {
        List<List<Integer>> flowToBothPacificAndAtlanticOceans = new ArrayList<>();
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < columns; c++) {
                if (flowToPacific[r][c] && flowToAtlantic[r][c]) {
                    flowToBothPacificAndAtlanticOceans.add(List.of(r, c));
                }
            }
        }
        return flowToBothPacificAndAtlanticOceans;
    }

    private void mapWaterFlow(int[][] heights) {
        for (int r = 0; r < rows; r++) {
            depthFirstSearch(heights, flowToPacific, r, 0);
            depthFirstSearch(heights, flowToAtlantic, r, columns - 1);
        }
        for (int c = 0; c < columns; c++) {
            depthFirstSearch(heights, flowToPacific, 0, c);
            depthFirstSearch(heights, flowToAtlantic, rows - 1, c);
        }
    }

    private void depthFirstSearch(int[][] heights, boolean[][] waterFlow, int row, int column) {
        waterFlow[row][column] = true;
        for (int i = 0; i < moves.length; i++) {
            int r = row + moves[i][0];
            int c = column + moves[i][1];
            if (pointIsInGrid(r, c) && !waterFlow[r][c] && heights[r][c] >= heights[row][column]) {
                depthFirstSearch(heights, waterFlow, r, c);
            }
        }
    }

    private boolean pointIsInGrid(int r, int c) {
        return r >= 0 && r < rows && c >= 0 && c < columns;
    }
}
