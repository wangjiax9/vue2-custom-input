<template>
<div class="rich-edit">
    <div class="h">
        <dl>
            <dd><span id="bold" title="粗体"><i class="ico ico-rich-bold"></i></span></dd>
            <dd><span id="strikeThrough" title="划掉"><i class="ico ico-rich-linethrough"></i></span></dd>
            <dd>
                <form id="uploadForm" action="http://file.webapp.163.com/gameapp/file/new/" method="POST" enctype="multipart/form-data">
                    <span id="insertImg" title="插入图片"><i class="ico ico-rich-img"></i></span>
                    <input type="file" name="fpfile" id="imgFile" style="visibility: hidden;"/>
                    <input type="hidden" name="Authorization" id="authorization" value="Policy xx">
                </form>
            </dd>
        </dl>
    </div>
    <div class="content"  id="editor" contentEditable="true" placeholder="分享你和游戏的故事~干货内容有几率出现在游戏详情页中~"></div>
</div>  
</template>

<script>
export default {

}
</script>

<style lang="scss">

</style>
