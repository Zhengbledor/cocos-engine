/****************************************************************************
 Copyright (c) 2016 Chukong Technologies Inc.
 Copyright (c) 2017-2022 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
****************************************************************************/

#include "MappingUtils.h"
#include "base/memory/Memory.h"

namespace se {

// NativePtrToObjectMap
NativePtrToObjectMap::Map *NativePtrToObjectMap::__nativePtrToObjectMap = nullptr; // NOLINT
bool NativePtrToObjectMap::__isValid = false;                                      // NOLINT

bool NativePtrToObjectMap::init() {
    if (__nativePtrToObjectMap == nullptr) {
        __nativePtrToObjectMap = ccnew NativePtrToObjectMap::Map();
    }
    __isValid = true;
    return __nativePtrToObjectMap != nullptr;
}

void NativePtrToObjectMap::destroy() {
    if (__nativePtrToObjectMap != nullptr) {
        delete __nativePtrToObjectMap;
        __nativePtrToObjectMap = nullptr;
    }
    __isValid = false;
}

bool NativePtrToObjectMap::isValid() {
    return __isValid;
}

void NativePtrToObjectMap::emplace(void *nativeObj, Object *seObj) {
    __nativePtrToObjectMap->emplace(nativeObj, seObj);
}

NativePtrToObjectMap::Map::iterator NativePtrToObjectMap::find(void *nativeObj) {
    return __nativePtrToObjectMap->find(nativeObj);
}

NativePtrToObjectMap::Map::iterator NativePtrToObjectMap::erase(Map::iterator iter) {
    return __nativePtrToObjectMap->erase(iter);
}

void NativePtrToObjectMap::erase(void *nativeObj) {
    __nativePtrToObjectMap->erase(nativeObj);
}

void NativePtrToObjectMap::clear() {
    __nativePtrToObjectMap->clear();
}

size_t NativePtrToObjectMap::size() {
    return __nativePtrToObjectMap->size();
}

const NativePtrToObjectMap::Map &NativePtrToObjectMap::instance() {
    return *__nativePtrToObjectMap;
}

NativePtrToObjectMap::Map::iterator NativePtrToObjectMap::begin() {
    return __nativePtrToObjectMap->begin();
}

NativePtrToObjectMap::Map::iterator NativePtrToObjectMap::end() {
    return __nativePtrToObjectMap->end();
}
} // namespace se