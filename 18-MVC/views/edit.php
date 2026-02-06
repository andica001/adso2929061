<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MVC: Model | View | Controller</title>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>

<body class="bg-black min-h-[100dvh] text-white p-10">
    <h1 class="text-4xl text-center font-bold">MVC</h1>
    <small class="block text-center">Model | View | Controller</small>

    <form action="/update/" method="POST">
        <input type="hidden" name="id" class="text-center text-xl text-black" value="<?= htmlspecialchars($data['pokemon']['id']) ?>">
        <div class="w-[70%] text-center overflow-x-auto rounded-box border border-base-content/5 bg-base-100 flex justify-center ml-50">
            <table class="table table-zebra bg-white text-black">
                <thead class="bg-black text-white">
                    <th class="w-1/4 border text-center">Property</th>
                    <th class="w-1/4 border text-center">Value</th>
                </thead>
                <tbody>
                    <tr>
                        <td class="border">
                            <label for="name" class="text-center text-xl text-black">Name: </label>
                        </td>
                        <td class="border">
                            <input type="text" name="name" class="text-center text-xl text-black" value="<?= htmlspecialchars($data['pokemon']['name']) ?>">
                        </td>
                    </tr>
                    <tr>
                        <td class="border">
                            <label for="type" class="text-center text-xl text-black">Type: </label>
                        </td>
                        <td class="border">
                            <input type="text" name="type" class="text-center text-xl text-black" value="<?= htmlspecialchars($data['pokemon']['type']) ?>">
                        </td>
                    </tr>
                    <tr>
                        <td class="border">
                            <label for="strenght" class="text-center text-xl text-black">Strenght: </label>
                        </td>
                        <td class="border">
                            <input type="number" name="strenght" class="text-center text-xl text-black" value="<?= htmlspecialchars($data['pokemon']['strenght']) ?>">
                        </td>
                    </tr>
                    <tr>
                        <td class="border">
                            <label for="stamina" class="text-center text-xl text-black">Stamina: </label>
                        </td>
                        <td class="border">
                            <input type="number" name="stamina" class="text-center text-xl text-black" value="<?= htmlspecialchars($data['pokemon']['stamina']) ?>">
                        </td>
                    </tr>
                    <tr>
                        <td class="border">
                            <label for="speed" class="text-center text-xl text-black">Speed: </label>
                        </td>
                        <td class="border">
                            <input type="number" name="speed"class="text-center text-xl text-black" value="<?= htmlspecialchars($data['pokemon']['speed']) ?>">
                        </td>
                    </tr>
                    <tr>
                        <td class="border">
                            <label for="accuracy" class="text-center text-xl text-black">Accuracy: </label>
                        </td>
                        <td class="border">
                            <input type="number" name="accuracy" class="text-center text-xl text-black" value="<?= htmlspecialchars($data['pokemon']['accuracy']) ?>">
                        </td>
                    </tr>
                    <tr>
                        <td class="border">
                            <label for="tname" class="text-center text-xl text-black">Trainer: </label>
                        </td>
                        <td class="border">
                            <select name="trainer_id">
                                <?php foreach ($data['trainers'] as $trainer): ?>
                                    <option value="<?= $trainer['id'] ?>" <?php if ($trainer['id'] == $data['pokemon']['trainer_id']): echo 'selected';
                                                                            endif; ?>><?= $trainer['name'] ?></option>
                                <?php endforeach ?>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button type="submit" class="btn btn-success flex mx-auto w-[200px] my-4 flex">
            Guardar
        </button>
        <a href="/" class="btn btn-error flex mx-auto w-[200px] my-4 flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                <path d="M232,184a8,8,0,0,1-16,0A88,88,0,0,0,65.78,121.78L43.4,144H88a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V88a8,8,0,0,1,16,0v44.77l22.48-22.33A104,104,0,0,1,232,184Z"></path>
            </svg>
            Regresar</a>
    </form>

</body>

</html>