import {useState} from 'react'

export default function Board(){

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setIsNext] = useState(true);

    const winner = callWinner(squares);
    let status;
    if(winner){
        status = 'Winner is: ' + winner;
    }else{
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    function boardClickHandler(i){
        if(squares[i] || winner){
            return;
        }

        const copiedSquares = squares.slice();
        if(xIsNext){
            copiedSquares[i] = 'X';
        }else{
            copiedSquares[i] = 'O';
        }
        setSquares(copiedSquares);
        setIsNext(!xIsNext);
    }

    return(
        <>

            <div>{status}</div>

            <div className='board-row'>
                <Square value = {squares[0]} onClickHandler={() => boardClickHandler(0)}/>
                <Square value = {squares[1]} onClickHandler={() => boardClickHandler(1)}/>
                <Square value = {squares[2]} onClickHandler={() => boardClickHandler(2)}/>
            </div>
            <div className='board-row'>
                <Square value={squares[3]} onClickHandler={() => boardClickHandler(3)}/>
                <Square value={squares[4]} onClickHandler={() => boardClickHandler(4)}/>
                <Square value={squares[5]} onClickHandler={() => boardClickHandler(5)}/>
            </div>
            <div className='board-row'>
                <Square value={squares[6]} onClickHandler={() => boardClickHandler(6)}/>
                <Square value={squares[7]} onClickHandler={() => boardClickHandler(7)}/>
                <Square value={squares[8]} onClickHandler={() => boardClickHandler(8)}/>
            </div>
        </>
    )

}

function Square({value, onClickHandler}){

    return(
        <button className='square' onClick = {onClickHandler}>
            {value}
        </button>
    )
}

function callWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if(squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}