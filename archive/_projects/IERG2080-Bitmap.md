---
title: "IERG2080 Project: 2D bitmap editor"
order: 1
---

[IERG2080 Project: 2D bitmap editor](https://github.com/dizzyryan/CUHK-CS-Notes/blob/main/IERG2080/proj.c)

You can compile the code by
```
gcc proj.c -o proj -lcurses
```

Or by creating a Makefile
```
make:
	gcc proj.c -o proj -lcurses
```

![image-center]({{ site.url }}{{ site.baseurl }}/files/images/proj_bitmap_demo_1.png){: .align-center}

Then, you can use the program by

```
./proj [in=in_file] [out=out_file]
./proj [out=out_file] [in=in_file]
```

Both arguments are optional. Yet, the phase in= or out= must be provided if the corresponding argument is used. in_file is the input file name, and out_
file is the output file name.

One [demo bitmap](https://github.com/dizzyryan/CUHK-CS-Notes/blob/main/IERG2080/helloworld.txt) is provided in the repository.

![image-center]({{ site.url }}{{ site.baseurl }}/files/images/proj_bitmap_demo_2.png){: .align-center}
![image-center]({{ site.url }}{{ site.baseurl }}/files/images/proj_bitmap_demo_3.png){: .align-center}
