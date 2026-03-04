{{-- <x-guest-layout>
    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" action="{{ route('login') }}">
        @csrf

        <!-- Email Address -->
        <div>
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required
                autofocus autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <x-input-label for="password" :value="__('Password')" />

            <x-text-input id="password" class="block mt-1 w-full" type="password" name="password" required
                autocomplete="current-password" />

            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Remember Me -->
        <div class="block mt-4">
            <label for="remember_me" class="inline-flex items-center">
                <input id="remember_me" type="checkbox"
                    class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500" name="remember">
                <span class="ms-2 text-sm text-gray-600">{{ __('Remember me') }}</span>
            </label>
        </div>

        <div class="flex items-center justify-end mt-4">
            @if (Route::has('password.request'))
            <a class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                href="{{ route('password.request') }}">
                {{ __('Forgot your password?') }}
            </a>
            @endif

            <x-primary-button class="ms-3">
                {{ __('Log in') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout> --}}

@extends('layouts.app')
@section('title', 'Larapets: Login')
@section('content')
    <section class="bg-[#0009] w-[380px] flex flex-col justify-center text-white items-center p-4 rounded-sm">
        <h1 class="text-4xl flex gap-2 border-b-2 pb-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-10" width="32" height="32" fill="currentColor"
                viewBox="0 0 256 256">
                <path
                    d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-104a40,40,0,1,0-65.94,30.44L88.68,172.77A8,8,0,0,0,96,184h64a8,8,0,0,0,7.32-11.23l-13.38-30.33A40.14,40.14,0,0,0,168,112ZM136.68,143l11,25.05H108.27l11-25.05A8,8,0,0,0,116,132.79a24,24,0,1,1,24,0A8,8,0,0,0,136.68,143Z">
                </path>
            </svg>
            Login
        </h1>
        <form class="flex flex-col gap-2" action="{{ url('login') }}" method="POST">
            @csrf
            {{ session('status') }}
            <label class="label text-white">Email:</label>
            <input class="input bg-[#0009]" type="text" name="email" value="{{ old('email') }}" placeholder="username@mail.com">
            @error('email')
                <small class="badge badge-error">{{ $message }}</small>
            @enderror
            <label class="label text-white">Password:</label>
            <input class="input bg-[#0009]" type="password" name="password" >
            @error('password')
                <small class="badge badge-error">{{ $message }}</small>
            @enderror
            <button class="btn btn-outline">Login</button>
        </form>
    </section>
@endsection