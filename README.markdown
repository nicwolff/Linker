Linker
======

Put the linker.html file in the issue directory with the plist files and open it in your browser.

Or, to be able to save your plist changes back to disk, run the server with

    node server.js <path> [<port>]

where <path> is the directory containing the issue directories, and the optional <port> is the port to listen on, which defaults to 8124. Then visit `http://localhost:8124/` (or whatever port you chose) with your browser.

Changes
-------

### Version 13080800, 8 Aug 2013

* Autosense page image size based on title code in filename
* Add indicator of page image size to toolbar
* Override page image size by clicking on indicator
* Clean up toolbar and move Refresh to "R" hotkey
* server.js takes listen port as optional second parameter

Notices
-------

>Copyright (c) 2013 Nic Wolff

>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
