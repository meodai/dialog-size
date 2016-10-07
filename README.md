<h1 align="center"><img width="80%" src="media/logo.png" alt="dialog(size)"></h1>

A relative size-system that aims to ease the dialog between design and frontend by providing a system that is easily extendable and does not rely on names.

Play around with it in the [**demo**](http://sassmeister.com/gist/7e563730c9a2c15581e5c40a10098369)

## Installation 💾

```
npm install dialog-size
```

## Basic usage ☝️

1. Import `dialog-size.scss`

    ```scss
    @import 'dialog-size/dialog-size';
    ```
    PS: make sure to add `node_modules` to your [import paths](https://github.com/sass/node-sass#includepaths)

2. Define a palette of possible sizes by setting the `$dialog-sizes`

    ```scss
    $dialog-sizes:
        (0.2rem tiny) // size(-1)
        0.5rem
        (0.75rem small)
        0.8rem
        (1rem medium isBase) // size(0)
        1.2rem
        (1.5rem large)
        3.5rem
        5rem
        (10rem huge)
        20rem;  // size(1)
    ```
3. Call the `size()` function

    ```scss
    body {
        padding: size(-1); // => 0.2rem
        font-size: size(0); // => 1rem
    }

    h1 {
        font-size: size(1); // => 20rem
        padding: size(large) 0; // => 1.5rem 0
    }

    p {
        padding: size(3rem); // => 3.5rem
    }
    ```

## Usage 📝

Once done your $dialog-sizes is set up, the `size()` function can be used in three different ways

### Relative system

- `size(0)` will return the base size (1rem)
- `size(1)` will return the largest size in your system (20rem)
- `size(-1)` will return the smallest size in your system (0.2rem)
- `size(.2)` will snap to the closest value in your system

### Names

You can also refer to absolute points in your size system by using names

- `size(large)` will return 1.5rem

### Value

There is also the possibility to use a size in the same unit than your system. (In this case REM)

- `size(9rem)` will return 10rem since it's the closest in your system

## Contributors 👯

- [Nirazul the brain](//github.com/nirazul)
- [Ingvi the magnificent viking](//github.com/ingvijonasson)

## License 👮🏼

Created with ♥ by [meodai](//github.com/meodai). Licensed under the [MIT License](LICENSE).
