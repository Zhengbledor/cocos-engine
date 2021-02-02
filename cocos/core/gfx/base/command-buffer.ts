/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

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
 */

/**
 * @packageDocumentation
 * @module gfx
 */

import { Buffer } from './buffer';
import { DescriptorSet } from './descriptor-set';
import { Device } from './device';
import { Framebuffer } from './framebuffer';
import { InputAssembler } from './input-assembler';
import { PipelineState } from './pipeline-state';
import { Queue } from './queue';
import { RenderPass } from './render-pass';
import { Texture } from './texture';
import {
    Obj,
    ObjectType,
    StencilFace,
    CommandBufferType,
    CommandBufferInfo,
    BufferTextureCopy, Color, Rect, Viewport,
} from './define';
import { GlobalBarrier } from './global-barrier';
import { TextureBarrier } from './texture-barrier';

/**
 * @en GFX command buffer.
 * @zh GFX 命令缓冲。
 */

export abstract class CommandBuffer extends Obj {
    /**
     * @en Type of the command buffer.
     * @zh 命令缓冲类型。
     */
    get type (): CommandBufferType {
        return this._type;
    }

    /**
     * @en Type of the command buffer.
     * @zh 命令缓冲类型。
     */
    get queue (): Queue {
        return this._queue!;
    }

    /**
     * @en Number of draw calls currently recorded.
     * @zh 绘制调用次数。
     */
    get numDrawCalls (): number {
        return this._numDrawCalls;
    }

    /**
     * @en Number of instances currently recorded.
     * @zh 绘制 Instance 数量。
     */
    get numInstances (): number {
        return this._numInstances;
    }

    /**
     * @en Number of triangles currently recorded.
     * @zh 绘制三角形数量。
     */
    get numTris (): number {
        return this._numTris;
    }

    protected _device: Device;

    protected _queue: Queue | null = null;

    protected _type: CommandBufferType = CommandBufferType.PRIMARY;

    protected _numDrawCalls = 0;

    protected _numInstances = 0;

    protected _numTris = 0;

    constructor (device: Device) {
        super(ObjectType.COMMAND_BUFFER);
        this._device = device;
    }

    public abstract initialize (info: CommandBufferInfo): boolean;

    public abstract destroy (): void;

    /**
     * @en Begin recording commands.
     * @zh 开始记录命令。
     * @param renderPass [Secondary Command Buffer Only] The render pass the subsequent commands will be executed in
     * @param subpass [Secondary Command Buffer Only] The subpass the subsequent commands will be executed in
     * @param frameBuffer [Secondary Command Buffer Only, Optional] The framebuffer to be used in the subpass
     */
    public abstract begin (renderPass?: RenderPass, subpass?: number, frameBuffer?: Framebuffer): void;

    /**
     * @en End recording commands.
     * @zh 结束记录命令。
     */
    public abstract end (): void;

    /**
     * @en Begin render pass.
     * @zh 开始 RenderPass。
     * @param framebuffer The frame buffer used.
     * @param renderArea The target render area.
     * @param clearFlag The clear flags.
     * @param clearColors The clearing colors.
     * @param clearDepth The clearing depth.
     * @param clearStencil The clearing stencil.
     */
    public abstract beginRenderPass (renderPass: RenderPass, framebuffer: Framebuffer,
        renderArea: Rect, clearColors: Color[], clearDepth: number, clearStencil: number): void;

    /**
     * @en End render pass.
     * @zh 结束 RenderPass。
     */
    public abstract endRenderPass (): void;

    /**
     * @en Bind pipeline state.
     * @zh 绑定 GFX 管线状态。
     * @param pipelineState The pipeline state to be bound.
     */
    public abstract bindPipelineState (pipelineState: PipelineState): void;

    /**
     * @en Bind descriptor set.
     * @zh 绑定 GFX 描述符集。
     * @param descriptorSet The descriptor set to be bound.
     */
    public abstract bindDescriptorSet (set: number, descriptorSets: DescriptorSet, dynamicOffsets?: number[]): void;

    /**
     * @en Bind input assembler.
     * @zh 绑定 GFX 输入汇集器。
     * @param inputAssembler The input assembler to be bound.
     */
    public abstract bindInputAssembler (inputAssembler: InputAssembler): void;

    /**
     * @en Set viewport.
     * @zh 设置视口。
     * @param viewport The new viewport.
     */
    public abstract setViewport (viewport: Viewport): void;

    /**
     * @en Set scissor range.
     * @zh 设置剪裁区域。
     * @param scissor The new scissor range.
     */
    public abstract setScissor (scissor: Rect): void;

    /**
     * @en Set line width.
     * @zh 设置线宽。
     * @param lineWidth The new line width.
     */
    public abstract setLineWidth (lineWidth: number): void;

    /**
     * @en Set depth bias.
     * @zh 设置深度偏移。
     * @param depthBiasConstantFactor The new depth bias factor.
     * @param depthBiasClamp The new depth bias clamp threshold.
     * @param depthBiasSlopeFactor  The new depth bias slope factor.
     */
    public abstract setDepthBias (depthBiasConstantFactor: number, depthBiasClamp: number, depthBiasSlopeFactor: number): void;

    /**
     * @en Set blend constants.
     * @zh 设置混合因子。
     * @param blendConstants The new blend constants.
     */
    public abstract setBlendConstants (blendConstants: number[]): void;

    /**
     * @en Set depth bound.
     * @zh 设置深度边界。
     * @param minDepthBounds The new minimum depth bound.
     * @param maxDepthBounds The new maximum depth bound.
     */
    public abstract setDepthBound (minDepthBounds: number, maxDepthBounds: number): void;

    /**
     * @en Set stencil write mask.
     * @zh 设置模板写掩码。
     * @param face The effective triangle face.
     * @param writeMask The new stencil write mask.
     */
    public abstract setStencilWriteMask (face: StencilFace, writeMask: number): void;

    /**
     * @en Set stencil compare mask.
     * @zh 设置模板比较掩码。
     * @param face The effective triangle face.
     * @param reference The new stencil reference constant.
     * @param compareMask The new stencil read mask.
     */
    public abstract setStencilCompareMask (face: StencilFace, reference: number, compareMask: number): void;

    /**
     * @en Draw the specified primitives.
     * @zh 绘制。
     * @param inputAssembler The target input assembler.
     */
    public abstract draw (inputAssembler: InputAssembler): void;

    /**
     * @en Update buffer.
     * @zh 更新缓冲。
     * @param buffer The buffer to be updated.
     * @param data The source data.
     * @param size Size in bytes to be updated.
     */
    public abstract updateBuffer (buffer: Buffer, data: ArrayBuffer, size?: number): void;

    /**
     * @en Copy buffer to texture.
     * @zh 拷贝缓冲到纹理。
     * @param srcBuff The buffer to be copied.
     * @param dstTex The texture to copy to.
     * @param dstLayout The target texture layout.
     * @param regions The region descriptions.
     */
    public abstract copyBuffersToTexture (buffers: ArrayBufferView[], texture: Texture, regions: BufferTextureCopy[]): void;

    /**
     * @en Execute specified command buffers.
     * @zh 执行一组命令缓冲。
     * @param cmdBuffs The command buffers to be executed.
     * @param count The number of command buffers to be executed.
     */
    public abstract execute (cmdBuffs: CommandBuffer[], count: number): void;

    /**
     * @en Insert pipeline memory barriers.
     * @zh 插入管线内存屏障。
     * @param globalBarrier The global memory barrier to apply.
     * @param textureBarriers The texture memory barriers to apply.
     */
    public abstract pipelineBarrier (globalBarrier: GlobalBarrier, textureBarriers: TextureBarrier[] | null): void;
}
