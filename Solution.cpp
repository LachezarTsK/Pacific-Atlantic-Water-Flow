
#include <array>
#include <vector>
using namespace std;

class Solution {
    
    inline static const array<array<int, 2>, 4> moves{array<int, 2>{-1, 0}/*up*/, {1, 0}/*down*/, {0, -1}/*left*/,{0, 1}/*right*/};
    vector<vector<bool>> flowToPacific;
    vector<vector<bool>> flowToAtlantic;
    size_t rows;
    size_t columns;

public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>&heights) {
        if (heights.size() == 0 || heights[0].size() == 0) {
            return vector<vector<int>>();
        }

        rows = heights.size();
        columns = heights[0].size();
        flowToPacific.resize(rows, vector<bool>(columns, false));
        flowToAtlantic.resize(rows, vector<bool>(columns, false));
        mapWaterFlow(heights);

        return findPointsFlowingToBothPacificAndAtlanticOceans();
    }

private:
    vector<vector<int>> findPointsFlowingToBothPacificAndAtlanticOceans() {
        vector<vector<int>> flowToBothPacificAndAtlanticOceans;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < columns; c++) {
                if (flowToPacific[r][c] && flowToAtlantic[r][c]) {
                    flowToBothPacificAndAtlanticOceans.push_back(vector<int>{r, c});
                }
            }
        }
        return flowToBothPacificAndAtlanticOceans;
    }

    void mapWaterFlow(const vector<vector<int>>&heights) {
        for (int r = 0; r < rows; r++) {
            depthFirstSearch(heights, flowToPacific, r, 0);
            depthFirstSearch(heights, flowToAtlantic, r, columns - 1);
        }
        for (int c = 0; c < columns; c++) {
            depthFirstSearch(heights, flowToPacific, 0, c);
            depthFirstSearch(heights, flowToAtlantic, rows - 1, c);
        }
    }

    void depthFirstSearch(const vector<vector<int>>&heights, vector<vector<bool>>&waterFlow, int row, int column) {
        waterFlow[row][column] = true;
        for (const auto& move : moves) {
            int r = row + move[0];
            int c = column + move[1];
            if (pointIsInGrid(r, c) && !waterFlow[r][c] && heights[r][c] >= heights[row][column]) {
                depthFirstSearch(heights, waterFlow, r, c);
            }
        }
    }

    bool pointIsInGrid(int r, int c) {
        return r >= 0 && r < rows && c >= 0 && c < columns;
    }
};
