<div class="navbar bg-black/70 text-white fixed top-0 left-0">
    <div class="flex-1">
        <a href="/" class="btn btn-ghost text-xl">LaraPets</a>
    </div>
    <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
            @guest
                <li>
                    <a href="{{ url('login') }}"
                        class="{{ request()->is('login') ? 'bg-white/30 pointer-events-none' : '' }}">
                        Login
                    </a>
                </li>
                <li>
                    <a href="{{ url('register') }}"
                        class="{{ request()->is('register') ? 'bg-white/30 pointer-events-none' : '' }}">
                        Register
                    </a>
                </li>
            @else
                <li>
                    <details>
                        <summary>{{Auth::user()->fullname}}</summary>
                        <ul class="bg-black/50 rounded-t-none p-2 w-40 -ms-10">
                            <li>
                                <a href="{{ url('users') }}">
                                    Users Module
                                </a>
                            </li>
                            <li>
                                <a {{ url('pets') }}>
                                    Pets Module
                                </a>
                            </li>
                            <li>
                                <a {{ url('adoptions') }}>
                                    Adoptions Module
                                </a>
                            </li>
                            <li>
                                <form method="POST" action="{{ route('logout') }}">
                                    @csrf

                                    <a class="" href="route('logout')"
                                        onclick="event.preventDefault(); this.closest('form').submit();">
                                        Log Out
                                    </a>
                                </form>
                            </li>
                        </ul>
                    </details>
                </li>
            @endguest
        </ul>
    </div>
</div>