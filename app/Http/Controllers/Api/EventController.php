<?php

namespace App\Http\Controllers\Api;

use App\Event;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Libraries\Constant;
use DateTime;
use Carbon\CarbonPeriod;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $event = Event::all();

        return response()->json($event);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Event::truncate();
        $begin = new DateTime(date('Y-m-d', strtotime($request->dateFrom)));
        $end = new DateTime(date('Y-m-d', strtotime($request->dateTo)));
        $days = [
            'Monday'=>Constant::MONDAY,
            'Tuesday'=>Constant::TUESDAY,
            'Wednesday'=>Constant::WEDNESDAY,
            'Thursday'=>Constant::THURSDAY,
            'Friday'=>Constant::FRIDAY,
            'Saturday'=>Constant::SATURDAY,
            'Sunday'=>Constant::SUNDAY
        ];

        try{
            for($i = $begin; $i <= $end; $i->modify('+1 day')){
                    $currentDay = $i->format("l");
                    $currentDate = $i->format("Y-m-d");
                    if(in_array($days[$currentDay], $request->dayOptions)){
                        $event = new Event();
                                $event->title = $request->eventTitle;
                                $event->date = date('Y-m-d', strtotime($currentDate));
                                $event->save();
                    }
            }
            return response()->json(['success' => 'success'], 200);
        }catch(Exception $e) {
            return response()->json(['error' => 'invalid'], 401);
            return $e->getMessage();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
