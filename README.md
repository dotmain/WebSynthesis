# WebSynthesis
Synthesis Powered Thinking Web Demo

Procedural thinking web synthesis demo for alphasep's vosk-api, https://github.com/alphacep/vosk-api/tree/master/nodejs.


# For demo purpose only - NOT FOR COMMERCIAL USE -

A thinking web synthesis demo.

For commercial intelligent and thinking machine non entertainment purpose licenses, thinking machine and thinking web synthesis licenses, inteligent machine engineering or congitive and synthetic intelligence consulting, please contact me. discord: .gg/qEaspkC

### Intelligent and thinking machines, along with thinking web and machine synthesis and synthetic intelligence are a mainvolume / planetever protected intellectual property. 
™

@mainvolume
mainvolume.com
planetever.com

We are gonna license synthesis to revolutionize machines. 



Build info: Linux 20.04, arm64, 64bit

.a demo purpose thinking web synthesis license. property of mainvolume, by m41n1485, for planetever. xxxxi.


#This is how its been built:
after installation process for vosk-api, along with nodejs builds according to instructions. 

step 1:


The build tested with node-0.10.15, node-0.12 is not yet supported by swig.
You need swig of newest version 4.0.1


this is based on vosk-api's docker build:
The outline of the build is here.
https://github.com/alphacep/vosk-api/blob/master/travis/Dockerfile.manylinux#L26

```


mkdir opt
  $ sudo apt install wget automake autoconf libtool cmake

 cd opt \
    && wget -O swig-4.0.1.tar.gz https://sourceforge.net/projects/swig/files/swig/swig-4.0.1/swig-4.0.1.tar.gz/download \
    && tar xf swig-4.0.1.tar.gz \
    && cd swig-4.0.1 \
    && ./configure --prefix=/usr && make -j 10 && sudo make install \
    && cd .. \
    && rm -rf swig-4.0.1.tar.gz swig-4.0.1
```
```
Step 2:
 cd opt \
    && git clone -b lookahead-1.8.0 --single-branch https://github.com/alphacep/kaldi \
    && cd opt/kaldi/tools \
    && git clone -b v0.3.13 --single-branch https://github.com/xianyi/OpenBLAS \
    && git clone -b v3.2.1  --single-branch https://github.com/alphacep/clapack \
    && make -C OpenBLAS ONLY_CBLAS=1 DYNAMIC_ARCH=1 TARGET=NEHALEM USE_LOCKING=1 USE_THREAD=0 all \
    && make -C OpenBLAS PREFIX=$(pwd)/OpenBLAS/install sudo install \
    && mkdir -p clapack/BUILD && cd clapack/BUILD && sudo cmake .. && sudo make -j 10 && find . -name "*.a" | xargs cp -t ../../OpenBLAS/install/lib \
    && cd /opt/kaldi/tools \
    && git clone --single-branch https://github.com/alphacep/openfst openfst \
    && cd openfst \
    && autoreconf -i \
    && CFLAGS="-g -O3" ./configure --prefix=/home/development/mother-server/opt/kaldi/tools/openfst --enable-static --enable-shared --enable-far --enable-ngram-fsts --enable-lookahead-fsts --with-pic --disable-bin \
    && make -j 10 && sudo make install \
    && cd opt/kaldi/src \
    && ./configure --mathlib=OPENBLAS_CLAPACK --shared --use-cuda=no \
    && sed -i 's:-msse -msse2:-msse -msse2:g' kaldi.mk \
    && sed -i 's: -O1 : -O3 :g' kaldi.mk \
    && sudo make -j $(nproc) online2 lm rnnlm \
    && find opt/kaldi -name "*.o" -exec rm {} \;
```
```
$ npm install --kaldi_root=/home/user/kaldi
```

### Updated build scripts:
https://github.com/alphacep/vosk-api/tree/master/travis
For Windows and Raspberry Pi we recommend cross-build with mingw and corresponding ARM toolchain. See docker files for details.




Then cd to project folder:

in the WebSynthesis project folder
```
$ wget https://alphacephei.com/kaldi/models/vosk-model-small-en-us-0.15.zip
$ unzip vosk-model-small-en-us-0.15.zip
$ mv vosk-model-small-en-us-0.15 model
```

```
node test-syntesis.js
```

watch out for errors. THS CODE, DESIGN, CONCEPTS AND PRODUCTS MAY NOT BE USED FOR COMMERCIAL PURPOSES FOR MACHINE INTELLIGENCE IN ANY FORM.
Y
