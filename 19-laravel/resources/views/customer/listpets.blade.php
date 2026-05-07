@extends('layouts.app')

@section('title', 'Larapets: ListPets')

@section('content')
    @include('partials.navbar')
    <h1 class="mt-6 text-4xl text-white flex gap-2 items-center justify-center pb-4 border-b-2 border-neutral-50 mb-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor" viewBox="0 0 256 256">
            <path
                d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z">
            </path>
        </svg>
        Module Pets
    </h1>

    <div class="breadcrumbs text-sm text-white mb-6">
        <ul>
            <li>
                <a href="{{ url('dashboard') }}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z"></path>
                    </svg>
                    Dashboard
                </a>
                </li>
                <li>
                <a href="{{ url('listpets') }}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>
                    </svg>
                    List Pets
                </a>
                </li>
            </ul>
        </div>

    {{-- Options --}}
    <div class="flex flex-col gap-4 justify-center items-center">
        
        {{-- Search --}}
        <form action="{{ url('customer/searchpets') }}" method="GET">
            <label class="input text-white bg-[#0009] w-58 md:w-112 outline outline-white mb-10">
                <input type="search" placeholder="Search..." name="qsearch" id="qsearch" value="{{ request('qsearch') }}" />
            </label>
        </form>
    </div>


    <div class="overflow-x-auto rounded-box text-white border border-base-content/5 bg-black/70">
        <table class="table">
            <!-- head -->
            <thead>
                <tr class="text-white">
                    <th class="hidden md:table-cell">ID</th>
                    <th>Photo</th>
                    <th class="hidden md:table-cell">Name</th>
                    <th>Kind</th>
                    <th>Breed</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody class="datalist">
                @foreach ($pets as $pet)
                    <tr class="text-white even:bg-gray-900">
                        <td class="hidden md:table-cell">{{ $pet->id }}</td>
                        <td>
                            <div class="avatar">
                                <div class="mask mask-squircle w-14">
                                    <img src="{{ asset('images/' . $pet->image)}}" alt="">
                                </div>
                            </div>
                        </td>
                        <td class="hidden md:table-cell">{{ $pet->name }}</td>
                        <td>{{ $pet->kind }}</td>
                        <td>{{ $pet->breed }}</td>
                        <td class="flex gap-1 justify-center items-center h-20">
                            <a href="{{ url('showpet/' . $pet->id) }}" class="btn btn-outline btnxs btn-default">
                                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="currentcolor"
                                    viewBox="0 0 256 256">
                                    <path
                                        d="M237.2,151.87v0a47.1,47.1,0,0,0-2.35-5.45L193.26,51.8a7.82,7.82,0,0,0-1.66-2.44,32,32,0,0,0-45.26,0A8,8,0,0,0,144,55V80H112V55a8,8,0,0,0-2.34-5.66,32,32,0,0,0-45.26,0,7.82,7.82,0,0,0-1.66,2.44L21.15,146.4a47.1,47.1,0,0,0-2.35,5.45v0A48,48,0,1,0,112,168V96h32v72a48,48,0,1,0,93.2-16.13ZM76.71,59.75a16,16,0,0,1,19.29-1v73.51a47.9,47.9,0,0,0-46.79-9.92ZM64,200a32,32,0,1,1,32-32A32,32,0,0,1,64,200ZM160,58.74a16,16,0,0,1,19.29,1l27.5,62.58A47.9,47.9,0,0,0,160,132.25ZM192,200a32,32,0,1,1,32-32A32,32,0,0,1,192,200Z">
                                    </path>
                                </svg></a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="7">
                        {{ $pets->links('partials.pagination') }}
                    </td>
                </tr>

            </tfoot>
        </table>
    </div>
@endsection

@section('js')
    <script>

        //import file
        $('.btn-import').click(function (e) {
            $('#file').click()
        })

        $('#file').change(function (e) {
            $(this).parent().submit();
        })
        //Mensajes
        @if(session('message'))
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('message') }}",
                showConfirmButton: false,
                timer: 4500
            });
        @endif


        // Search - - - - - - - - - - - - - - - -
        function debounce(func, wait) {
            let timeout
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout)
                    func(...args)
                };
                clearTimeout(timeout)
                timeout = setTimeout(later, wait)
            }
        }
        const search = debounce(function (query) {

            $token = $('input[name=_token]').val()

            $.post("search/listpets", { 'q': query, '_token': $token },
                function (data) {
                    $('.datalist').html(data).hide().fadeIn(1000)
                }
            )
        }, 500)
        $('body').on('input', '#qsearch', function (event) {
            event.preventDefault()
            const query = $(this).val()

            $('.datalist').html(`<tr>
                                    <td colspan="7" class="text-center py-18">
                                        <span class="loading loading-spinner loading-xl"></span>
                                    </td>
                                </tr>`)
            if (query != '') {
                search(query)
            } else {
                setTimeout(() => {
                    window.location.replace('listpets')
                }, 500)
            }
        })
    </script>
@endsection