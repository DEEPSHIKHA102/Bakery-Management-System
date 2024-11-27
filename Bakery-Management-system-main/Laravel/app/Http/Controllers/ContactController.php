<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contact_data = Contact::all();
        return response()->json(['status' => 200, 'Contacts' => $contact_data]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view("contactpage");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $data = $request->validate([
        'name' => 'required',
        'complain' => 'required',
        'feedback' => 'required',
        'email' => 'required',
        'user_id'=>'required'
    ]);

   $contact = new Contact($data);
   $contact->save();
    
}


    // ...


    // ...




    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        //
    }
}
