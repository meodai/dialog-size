# dialog-size

Aims to normalize sizes in a CSS project. When using the `size()` function, the sizes will snap to the closes one in a defined list. The advantage is that you will not break out of the size system you have defined for your project, but you will still be able to play around with the values until it feels right. 

It also solves the problem of naming sizes, since every size can be accessed with a number between -1 and 1

## Installation

```
npm install dialog-sizes
```

## Usage
Define a palette of possible sizes by setting the `$dialog-sizes`
```scss
$dialog-sizes: 0.2rem 0.5rem 0.75rem 1rem 1.2rem 1.5rem 4rem 4.5rem 5rem 10rem;
```

Set the default size in `$dialog-sizes-base`.
```scss
$dialog-sizes-base: 1rem
```
Once done you, are able to use the `size()` function in different ways:
`size(1)` will return the largest size in your system (10rem)
`size(-1)` will return the smalest size in your system (0.2rem)
`size(0)` will return the base size (1rem)
`size(.2)` will snap to the closest value in your system

There is also the possibility to use a size in the same unit then your system. (In this case REM)
`size(17rem)` will retrun 16rem since its the closest in your system
