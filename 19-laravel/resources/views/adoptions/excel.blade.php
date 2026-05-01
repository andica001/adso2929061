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
                <th>NameUser</th>
                <th>photoUser</th>
                <th>PhoneUser</th>
                <th>NamePet</th>
                <th>ImagePet</th>
                <th>KindPet</th>
                <th>WeightPet</th>
                <th>AgePet</th>
                <th>BreedPet</th>
                <th>LocationPet</th>
                <th>DescriptionPet</th>
                <th>ActivePet</th>
                <th>StatusPet</th>
                
            </tr>
        </thead>
        <tbody>
            @foreach ($adopts as $adopt)
            <tr>
                <td>{{ $adopt->user->fullname }}</td>
                <td>
                    @if ($adopt->user->photo != 'no-photo.png')
                        <img src="{{ public_path().'/images/'.$adopt->user->photo }}" width="96px">
                    @else
                        No Photo
                    @endif
                </td>
                <td>{{ $adopt->user->phone }}</td>
                <td>{{ $adopt->pet->name }}</td>
                <td>
                    @if ($adopt->pet->image != 'no-photo.png')
                        <img src="{{ public_path().'/images/'.$adopt->pet->image }}" width="96px">
                    @else
                        No Photo
                    @endif
                </td>
                <td>{{ $adopt->pet->kind }}</td>
                <td>{{ $adopt->pet->weight }}</td>
                <td>{{ $adopt->pet->age }}</td>
                <td>{{ $adopt->pet->breed }}</td>
                <td>{{ $adopt->pet->location }}</td>
                <td>{{ $adopt->pet->description }}</td>
                <td>
                    @if ($adopt->pet->active == 1)
                        Active
                    @else
                        Inactive
                    @endif
                </td>
                <td>
                    @if ($adopt->pet->status == 1)
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