﻿// Modules are not supported yet
//export default Minesweeper;
//-------------------------------------------------------------------------------------------------
/**
 * Create matrix of objects with information about mines
 *
 * @param {number} rows - Number of rows of the matrix
 * @param {number} columns - Number of columns of the matrix
 * @param {number} mines - Number of mines in the game
 * @classdesc Class represente minesweeper game
 */
class Minesweeper {
    constructor(rows, columns, mines) {
        this.rows = rows;
        this.columns = columns;
        this.mines = mines;
        this._gameData = createGameData(rows, columns, mines);
    }

    /**
     * 
     * @public
     * @return {number/string/boolean} False - if rowIndex or columnIndex is incorrect otherwise return cell data (number or "mine")
     */
    getData(rowIndex, columnIndex) {
        if (rowIndex >= 0 && rowIndex < this.rows && columnIndex >= 0 && columnIndex < this.columns)
            return this._gameData[rowIndex][columnIndex].data;
        else
            return false;
    }
    //------------------------------------------------------------------------------
    getFlag(rowIndex, columnIndex) {
        if (rowIndex >= 0 && rowIndex < this.rows && columnIndex >= 0 && columnIndex < this.columns)
            return this._gameData[rowIndex][columnIndex].flag;
        else
            return false;
    }
    //------------------------------------------------------------------------------
    /**
     * @param {boolean} value - Used to set/remove flag
     * @return True if value is setted otherwise false.
     */
    setFlag(rowIndex, columnIndex, value) {
        if (rowIndex >= 0 && rowIndex < this.rows && columnIndex >= 0 && columnIndex < this.columns) {
            this._gameData[rowIndex][columnIndex].flag = value;
            return true;
        } else
            return false;
    }
    //------------------------------------------------------------------------------
    /**
     * Check if the cell was opened
     *
     * @function
     * @public
     */
    isOpened(rowIndex, columnIndex) {
        if (rowIndex >= 0 && rowIndex < this.rows && columnIndex >= 0 && columnIndex < this.columns) {
            return this._gameData[rowIndex][columnIndex].opened;
        } else {
            return false;
        }
    }
    //------------------------------------------------------------------------------
    /**
     * @function
     * @public
     */
    open(rowIndex, columnIndex) {
        //if (rowIndex >= 0 && rowIndex < rows && columnIndex >= 0 && columnIndex < columns) {
            this._gameData[rowIndex][columnIndex].opened = true;
            
    }
    //------------------------------------------------------------------------------
    /**
     * Check if all cells without mines are opened
     *
     * @function
     * @public
     * @return {boolean} True - if all cells without mines are opened otherwise false
     */
    isGameCompleted() {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                if (this._gameData[i][j].data != "mine" && this._gameData[i][j].opened == false) {
                    return false;
                }
            }
        }
        return true;
    }
    //------------------------------------------------------------------------------
    getRows() {
        return this.rows;
    }
    //------------------------------------------------------------------------------
    getColumns() {
        return this.columns;
    }

    //------------------------------------------------------------------------------

}
//-------------------------------------------------------------------------------------------------
/**
 * Create object to storage information about each cell
 * @class
 */
function DataNode() {
    /** @public {number/string} */
    this.data;
    /** @public {boolean} */
    this.opened;
    /** @public {boolean} */
    this.flag;
}
//------------------------------------------------------------------------------
/**
 * Create main matrix
 *
 * @private
 * @return {matrix} - Matrix of DataNode class objects
 */
function createGameData(rows, columns, mines) {
    var gameData = new Array(rows);
    for (var i = 0; i < rows; i++) {
        gameData[i] = new Array(columns);
        for (var j = 0; j < columns; j++) {
            gameData[i][j] = new DataNode();
            gameData[i][j].data = 0;
            gameData[i][j].opened = false;
            gameData[i][j].flag = false;
        }
    }
    // Random set  of mine
    for (var i = 0; i < mines; i++) {
        var rowIndex = getRandomInt(0, rows - 1);
        var columnIndex = getRandomInt(0, columns - 1);
        if (gameData[rowIndex][columnIndex].data != "mine") {
            gameData[rowIndex][columnIndex].data = "mine";
            setCountsOfMines(gameData, rowIndex, columnIndex);
        } else {
            i--;
            continue;
        }
    }
    return gameData;
}








    //-------------------------------------------------------------------------------------------------
    /**
     * Main matrix
     *
     * @private
     */
//var gameData = createGameData(rows, columns, mines);
//------------------------------------------------------------------------------
/**
     * Increase near by cells of the mine
     *
     * @private
     * @param {matrix} matrix - Main matrix that is created
     * @param {number} i - Row index where mine placed
     * @param {number} j - Column index where mine placed
     */
function setCountsOfMines(matrix, i, j) {
    if (i != 0) {
        if (matrix[i - 1][j].data != "mine")
            matrix[i - 1][j].data++;
        if (j != 0)
            if (matrix[i - 1][j - 1].data != "mine")
                matrix[i - 1][j - 1].data++;
        if (j != matrix[0][0].lenght - 1)
            if (matrix[i - 1][j + 1].data != "mine")
                matrix[i - 1][j + 1].data++;
    }
    if (i != matrix[0].lenght - 1) {
        if (matrix[i + 1][j].data != "mine")
            matrix[i + 1][j].data++;
        if (j != 0)
            if (matrix[i + 1][j - 1].data != "mine")
                matrix[i + 1][j - 1].data++;
        if (j != matrix[0][0].lenght - 1)
            if (matrix[i + 1][j + 1].data != "mine")
                matrix[i + 1][j + 1].data++;
    }
    if (j != 0)
        if (matrix[i][j - 1].data != "mine")
            matrix[i][j - 1].data++;
    if (j != matrix[0][0].lenght - 1)
        if (matrix[i][j + 1].data != "mine")
            matrix[i][j + 1].data++;
}
//------------------------------------------------------------------------------
/**
 * Generate random integer
 * 
 * @private
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


var myrows = 15; // params in css
var mycolumns = 15;
var mymines = 30;


var minesweeper = new Minesweeper(myrows, mycolumns, mymines);

/**
 * Execute when page is ready
 */
$(document).ready(function () {
    $('body div.container').append(createBoard(myrows, mycolumns));
    $('body').append($('<h1\>').attr('id', 'game-result'));
});
//-------------------------------------------------------------------------------------------------
/**
 * Create rectangle of buttons - main game board
 *
 * @param {Number} rows - Number of rows of the board
 * @param {Number} columns - Number of columns of the board
 * @return {jQuery} Object that contain square of divs
 */
function createBoard(rows, columns) {
    var $divBoard = $('<div\>').addClass('minesweeper-board');
    var $button, $group;
    for (var i = 0; i < rows; i++) {
        $group = $('<div\>').addClass('btn-group btn-group-sm').attr('role', 'group');
        for (var j = 0; j < columns; j++) {
            $button = $('<div\>').on({
                click: onClickDivBoard,
                contextmenu: showFlag
            })
                                 .attr('id', i + '-' + j)
                                 .addClass('btn btn-default')
                                 .text('');
            //.html('<span class="gliphicon gliphicon-none" aria-hidden="true">&nbsp</span>');
            $group.append($button);
        }
        $divBoard.append($('<div\>').addClass('row').append($group));
    }
    return $divBoard;
}
//-------------------------------------------------------------------------------------------------
/**
 * Change view of div (open it) inside the main board when user click on it.
 */
function onClickDivBoard() {
    var idArray = $(this).attr("id").split("-");
    // Row and column of pressed cell
    var rowIndex = parseInt(idArray[0]);
    var columnIndex = parseInt(idArray[1]);
    var data = minesweeper.getData(rowIndex, columnIndex);

    // Change view of cells
    if (minesweeper.getFlag(rowIndex, columnIndex) == true) {
        return;
    }
    if (data == "mine") {
        showAllMines();
        $("#game-result").text("Game Over");

        // Disable onclick and oncontextmenu (right click) event
        $(".divBoard").find("div").off("click").off("contextmenu").on("contextmenu", function () { return false; });
    } else if (data != 0) {
        minesweeper.open(rowIndex, columnIndex);
        $(this).text(data);
        $(this).addClass("bg-gray");
    } else { // Empty cell
        minesweeper.open(rowIndex, columnIndex);
        checkNearbyCells(rowIndex, columnIndex);
    }
    if (minesweeper.isGameCompleted()) {
        $("#game-result").text("Game Completed");
        // Disable onclick and oncontextmenu (right click) event
        $(".divBoard").find("div").off("click").off("contextmenu").on("contextmenu", function () { return false; });
    }
}
//-------------------------------------------------------------------------------------------------
function showFlag() {
    var idArray = $(this).attr("id").split("-");
    // Row and column of pressed cell
    var rowIndex = parseInt(idArray[0]);
    var columnIndex = parseInt(idArray[1]);

    if (minesweeper.isOpened(rowIndex, columnIndex) == false) {
        if (minesweeper.getFlag(rowIndex, columnIndex) == true) {
            $("#" + rowIndex + "-" + columnIndex).removeClass("flag");
            minesweeper.setFlag(rowIndex, columnIndex, false);
        } else {
            $("#" + rowIndex + "-" + columnIndex).addClass("flag");
            minesweeper.setFlag(rowIndex, columnIndex, true);
        }
    }
    // Don't show the context menu
    return false;
}
//-------------------------------------------------------------------------------------------------
/**
 * Check and open near by cells. Recursive function.
 *
 * @param {number} rowIndex - Row index of selected cell
 * @param {number} columnIndex - Column index of selected cell
 */
function checkNearbyCells(rowIndex, columnIndex) {
    if (minesweeper.getFlag(rowIndex, columnIndex) == true) {
        return;
    }
    // Change first click cell
    $("#" + rowIndex + "-" + columnIndex).addClass("bg-white");

    var nearbyCells = new Array(2);
    for (var i = 0; i < nearbyCells.length; i++) {
        nearbyCells[i] = new Array(8);
    }
    nearbyCells[0][0] = rowIndex - 1;
    nearbyCells[1][0] = columnIndex - 1;
    nearbyCells[0][1] = rowIndex - 1;
    nearbyCells[1][1] = columnIndex;
    nearbyCells[0][2] = rowIndex - 1;
    nearbyCells[1][2] = columnIndex + 1;
    nearbyCells[0][3] = rowIndex;
    nearbyCells[1][3] = columnIndex - 1;
    nearbyCells[0][4] = rowIndex;
    nearbyCells[1][4] = columnIndex + 1;
    nearbyCells[0][5] = rowIndex + 1;
    nearbyCells[1][5] = columnIndex - 1;
    nearbyCells[0][6] = rowIndex + 1;
    nearbyCells[1][6] = columnIndex;
    nearbyCells[0][7] = rowIndex + 1;
    nearbyCells[1][7] = columnIndex + 1;

    var data;
    var opened;
    var flag;
    for (var i = 0; i < nearbyCells[0].length; i++) {
        data = minesweeper.getData(nearbyCells[0][i], nearbyCells[1][i]);
        opened = minesweeper.isOpened(nearbyCells[0][i], nearbyCells[1][i]);
        flag = minesweeper.getFlag(nearbyCells[0][i], nearbyCells[1][i]);
        // 0 == false
        if (flag == false && (data.toString() == "0" || data != false) && opened == false) {
            if (data == 0) {
                $("#" + nearbyCells[0][i] + "-" + nearbyCells[1][i]).addClass("bg-white");
                minesweeper.open(nearbyCells[0][i], nearbyCells[1][i]);
                checkNearbyCells(nearbyCells[0][i], nearbyCells[1][i]);
            } else {
                minesweeper.open(nearbyCells[0][i], nearbyCells[1][i]);
                $("#" + nearbyCells[0][i] + "-" + nearbyCells[1][i]).text(minesweeper.getData(nearbyCells[0][i], nearbyCells[1][i]));
                $("#" + nearbyCells[0][i] + "-" + nearbyCells[1][i]).addClass("bg-gray");
            }
        }
    }
}
//-------------------------------------------------------------------------------------------------
function showAllMines() {
    for (var i = 0; i < minesweeper.getRows() ; i++) {
        for (var j = 0; j < minesweeper.getColumns() ; j++) {
            if (minesweeper.getData(i, j) == "mine") {
                $("#" + i + "-" + j).addClass("mine");
            }
        }
    }
}