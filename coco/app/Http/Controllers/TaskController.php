<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function index()
    {
        return Task::all();
    }

    public function getTasks($project_id)
    {

        return Task::where('project_id', $project_id)->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'required|integer',
            'due_date' => 'required|date',
        ]);

        $task = Task::create($request->all());

        return response()->json($task, 201);
    }

    public function show($id)
    {
        return Task::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->update($request->all());

        return response()->json($task, 200);
    }

    public function destroy($id)
    {
        Task::destroy($id);

        return response()->json(null, 204);
    }
}
