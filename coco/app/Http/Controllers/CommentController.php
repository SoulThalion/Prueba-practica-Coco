<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    public function index()
    {
        return Comment::all();
    }

    public function getComments($task_id)
    {

        return Comment::where('task_id', $task_id)->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
            'task_id' => 'required|exists:tasks,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $comment = Comment::create($request->all());

        return response()->json($comment, 201);
    }

    public function show($id)
    {
        return Comment::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);
        $comment->update($request->all());

        return response()->json($comment, 200);
    }

    public function destroy($id)
    {
        Comment::destroy($id);

        return response()->json(null, 204);
    }
}
