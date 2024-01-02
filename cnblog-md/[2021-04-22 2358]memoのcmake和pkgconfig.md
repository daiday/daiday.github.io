之前看到过pkgconfig，完全不理解什么东西，也没有去探究这到底是个啥。

然而今天想要cmake brew的库，无意中查到一种解决方案，就是利用pkg-config。
老神奇了。

```cmake
# include(FindPkgConfig) # 也有这么写的，我没测试
find_package(PkgConfig REQUIRED) 

# 关键的一步来啦。假设我要找的是glfw3 glew
pkg_check_modules(PKG_DEP REQUIRED IMPORTED_TARGET glew glfw3)

# 好，这里先停一下，直接cmake来config一下，生成CMakeCache.txt，然后我们直接去看这个文件的内容；
# 我们直接搜索PKG_DEP（这个名字当然是随意的啦，自己看着命名吧）
# 不出意外，可以看到很多对应的变量，愉快的用这些宏吧！

message(${PKG_DEP_INCLUDE_DIRS})
message(${PKG_DEP_LIBRARY_DIRS})
message(${pkgcfg_lib_PKG_DEP_GLEW})
message(${pkgcfg_lib_PKG_DEP_glfw})

# 自己根据需要去target_include_directories、target_link_libraries吧

```

具体`pkg_check_modules`的用法，可以用命令`cmake --help-module FindPkgConfig`查看吧！

## 顺便说一下
pkg-config也是挺好用的。`pkg-config --libs --cflags glfw3`可以看到命令行上需要的libs信息和includes信息等。具体也可以去直接看help。

以上。