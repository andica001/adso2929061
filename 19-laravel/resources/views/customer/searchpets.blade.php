@forelse ($pets as $pet)
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
@empty
    <tr class="text-white even:bg-gray-900">
        <td colspan="10" class="text-center">No pets found.</td>
    </tr>
@endforelse