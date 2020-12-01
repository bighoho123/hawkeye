# 🦅 Hawkeye

Automated browser testing script

## Installation

You can install the package either locally or globally.

`npm i -g @jinzheli/hawkeye`

## Usage

### Basic (default)

Checking a list of urls returning **2xx** or **3xx** response status code.

`hawkeye basic --group foo`

This task will expect a `basic` folder in the working directory. The folder will contains file containing urls to check. The filename will be the group name.

A valid example is that a file `basic/foo` containing the following content

```
https://google.com
https://google.com/abcd
https://facebook.com
```

`hawkeye basic --group all`

This scans all the files within the `basic` folder, and run them all.