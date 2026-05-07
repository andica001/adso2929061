@extends('layouts.app')

@section('title', 'Larapets: Show Pet')

@section('content')
@include('partials.navbar')
<h1 class="text-4xl text-white flex gap-2 items-center justify-center pb-4 border-b-2 border-neutral-50 mb-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="currentColor" viewBox="0 0 256 256">
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
        </svg>
        Make Adoption
    </h1>
    {{-- Breadcrumbs --}}
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
                <li>
                <span class="inline-flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                    Make Adoption
                </span>
                </li>
            </ul>
        </div>
        {{-- Card --}}
        <div class="bg-[#0009] p-10 rounded-sm">
            {{-- Photo --}}
            <div class="avatar flex flex-col gap-1 items-center justify-center cursor-pointer hover:scale-105 transition ease-in">
                <div class="mask mask-squircle w-60">
                    <img src="{{ asset('images/'.$pet->image) }}" />
                </div>
            </div>
            {{-- Data --}}
            <div class="flex gap-2 flex-col md:flex-row">
                <ul class="list bg-[#0006] mt-4 text-white rounded-box shadow-md w-64">
                    <li class="list-row">
                        <span class="text-[#fff9] font-semibold">Name:</span> <span>{{ $pet->name }}</span>
                    </li> 
                    <li class="list-row">
                        <span class="text-[#fff9] font-semibold">Kind:</span> <span>{{ $pet->kind }}</span>
                    </li> 
                    <li class="list-row">
                        <span class="text-[#fff9] font-semibold">Weiht:</span> <span>{{ $pet->weight }}</span>
                    </li> 
                    <li class="list-row">
                        <span class="text-[#fff9] font-semibold">Age:</span> <span>{{ $pet->age}} </span>
                    </li> 
                    <li class="list-row">
                        <span class="text-[#fff9] font-semibold">Breed:</span> <span>{{ $pet->breed }}</span>
                    </li> 
                </ul>
                <ul class="list bg-[#0006] mt-4 text-white rounded-box shadow-md w-64">
                    <li class="list-row">
                        <span class="text-[#fff9] font-semibold">Location:</span> <span>{{ $pet->location }}</span>
                    </li> 
                    <li class="list-row">
                        <span class="text-[#fff9] font-semibold">Description:</span> <span>{{ $pet->description }}</span>
                    </li> 
                    <li class="list-row">
                        <span class="text-[#fff9] font-semibold">Active:</span> 
                        <span>
                            @if ($pet->active == 1)
                                <div class="badge badge-outline badge-success">Active</div>
                            @else
                                <div class="badge badge-outline badge-error">Inactive</div>
                            @endif
                        </span>
                    </li> 
                    <li class="list-row">
                        <span class="text-[#fff9] font-semibold">Status:</span> 
                        <span>
                            @if ($pet->active == 1)
                                <div class="badge badge-outline badge-success">Available</div>
                            @else
                                <div class="badge badge-outline badge-error">Not Available</div>
                            @endif
                        </span>
                    </li> 
                    
                </ul>
            </div>

            <a href="javascript:;" class="btn btn-xl btn-success mt-4 flex mx-auto btn-adopt" data-name="{{ $pet->name }}"">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor" viewBox="0 0 256 256">
                    <path
                        d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,2.55A28,28,0,0,0,140,112H100.68C92.05,100.36,88,90.12,88,80,88,62.65,102.41,48,119.46,48ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9Z">
                    </path>
                </svg>
                Make Adoption
            </a>
            <form class="hidden" method="POST" action="{{ url('makeadoption/')}}">
                <input type="hidden" name="pet_id" value="{{ $pet->id }}">
                @csrf
            </form>
        </div>

@endsection

@section('js')
<script>

    //Adopt
    $('.btn-adopt').click(function () {
        $name = $(this).attr('data-name')
        Swal.fire({
            title: "Are you sure?",
            text: "The Pet: " + $name + "  will be Adopted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, adopt It!"
        }).then((result) => {
            if (result.isConfirmed) {
                $(this).next().submit()
            }
        });
    })
</script>
@endsection
