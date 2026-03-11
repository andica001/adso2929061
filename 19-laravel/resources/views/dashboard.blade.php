@extends('layouts.app')

@section('title', 'Larapets: Dashboard')

@include('partials.navbar')

@section('content')

    <form method="POST" action="{{ route('logout') }}">
        @csrf

        <a class="btn btn-outline btn-error" href="route('logout')"
            onclick="event.preventDefault(); this.closest('form').submit();">
            Log Out
        </a>
    </form>

@endsection