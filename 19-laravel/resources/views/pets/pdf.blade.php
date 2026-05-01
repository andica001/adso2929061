<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>All Pets</title>
    <style>
        table {
            border: 2px solid #aaa;
            border-collapse: collapse
        }
        table th, table td {
            font-family: sans-serif;
            font-size: 10px;
            border: 2px solid #ccc;
            padding: 4px;
        }
        table tr:nth-child(odd) {
            background-color: #eee;
        }
        table th {
            background-color: #666;
            color: #fff;
            text-align: center;
        }
    </style>
</head>
<body>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Kind</th>
                <th>Weight</th>
                <th>Age</th>
                <th>Breed</th>
                <th>Location</th>
                <th>Description</th>
                <th>Active</th>
                <th>Status</th>
                
            </tr>
        </thead>
        <tbody>
            @foreach ($pets as $pet)
            <tr>
                <td>{{ $pet->name }}</td>
                <td>
                    @if ($pet->image != 'no-photo.png')
                        <img src="{{ public_path().'/images/'.$pet->image }}" width="96px">
                    @else
                        No Photo
                    @endif
                </td>
                <td>{{ $pet->kind }}</td>
                <td>{{ $pet->weight }}</td>
                <td>{{ $pet->age }}</td>
                <td>{{ $pet->breed }}</td>
                <td>{{ $pet->location }}</td>
                <td>{{ $pet->description }}</td>
                <td>
                    @if ($pet->active == 1)
                        Active
                    @else
                        Inactive
                    @endif
                </td>
                <td>
                    @if ($pet->status == 1)
                        Available
                    @else
                        Not Available
                    @endif
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>