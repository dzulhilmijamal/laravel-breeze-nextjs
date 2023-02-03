<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CardController extends Controller
{
    public function distribute(Request $request)
    {
        $n = $request->input('player');

        // Check if input value is valid
        if ($n <= 0) {
            return response()->json(['cardDistribution' => ['Invalid input value']]);
        }
    
        // Create an array of cards
        $cards = array();
        $suits = array("S", "H", "D", "C");
        $values = array("A", "2", "3", "4", "5", "6", "7", "8", "9", "X", "J", "Q", "K");
    
        // Fill the array with cards
        foreach ($suits as $suit) {
            foreach ($values as $value) {
                $cards[] = "$suit-$value";
            }
        }
    
        // Shuffle the cards
        shuffle($cards);
    
        // Distribute the cards to n people
        $cardDistribution = array();
        $limit = 52;
        for ($i = 1; $i <= $n; $i++) {
            if($n > $limit){
                if ($i <= $limit) {
                    $personCards = array();
                    for ($j = 1; $j <= $limit/$limit; $j++) {
                        $personCards[] = $cards[($i-1)*($limit/$limit) + $j - 1];
                    }
                    $cardDistribution[] = implode(",", $personCards);
                } else {
                    $cardDistribution[] = "No cards";
                }
            }else{
                $personCards = array();
                for ($j = 1; $j <= $limit/$n; $j++) {
                    $personCards[] = $cards[($i-1)*($limit/$n) + $j - 1];
                }
                $cardDistribution[] = implode(",", $personCards);
            }
        }
    
        return response()->json(['cardDistribution' => $cardDistribution]);
    }
}
