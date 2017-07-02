<template>
    <div class="ypw-banner" id="ypwBanner">
        <ul class="banner">
            <template v-for="(banner, index) in banners">
                <li class="cur"><a href="javascript:void(0)"><img :src="banner.img_url"></a></li>
            </template>
            
        </ul>
        <ul class="banner-index">
            <li class=""></li>
            <li class="cur"></li>
            <li class=""></li>
            <li class=""></li>
        </ul>  
        <div class="banner-page">
            <span class="page prev"><i class="ico ico-36 ico-prev-banner"></i></span>
            <span class="page next"><i class="ico ico-36 ico-next-banner"></i></span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            banners:[
                {img_url:'http://gameapp.fp.ps.netease.com/file/5914040d96dee4e167113791cxTxeSt1'},
                {img_url:'http://gameapp.fp.ps.netease.com/file/594b80e8a7f252c4c6a7240exUXUGcli'},
                {img_url:'http://gameapp.fp.ps.netease.com/file/591404db7f9d2a11bb5dd9f9M1a9lacw'},
                {img_url:'http://gameapp.fp.ps.netease.com/file/5914049f96dee4d61b24f7b84vIi9CNI'}
            ],
            curIndex:0
        }
    }
}
</script>
<style  lang="scss">
.ypw-banner {
    position: relative
}

.ypw-banner .banner {
    width: 1200px;
    height: 400px;
    position: relative;
    margin:auto;
    overflow: hidden
}

.ypw-banner .banner>li {
    position: absolute;
    left: 0;
    top: 0
}

.ypw-banner .banner>li.cur {
    z-index: 99
}

.ypw-banner .banner>li img {
    display: block;
    width: 1200px;
    height: 400px
}

.ypw-banner .banner-index {
    position: absolute;
    left: 540px;
    top: 370px;
    z-index: 100
}

.ypw-banner .banner-index>li {
    float: left;
    width: 10px;
    height: 10px;
    cursor: pointer;
    margin-right: 12px;
    background: #f8fbfd;
    -webkit-box-shadow: 0 0 2px #e2f5f4;
    -moz-box-shadow: 0 0 2px #e2f5f4;
    box-shadow: 0 0 2px #e2f5f4;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%
}

.ypw-banner .banner-index>li.cur {
    width: 30px;
    -webkit-border-radius: 4.5px;
    -moz-border-radius: 4.5px;
    border-radius: 4.5px;
    -webkit-transition: width .3s linear;
    -moz-transition: width .3s linear;
    -ms-transition: width .3s linear;
    -o-transition: width .3s linear;
    transition: width .3s linear
}

.ypw-banner .banner-page .page {
    display: block;
    cursor: pointer;
    position: absolute;
    top: 182px
}

.ypw-lump,.ypw-lump .lump-head {
    position: relative;
    margin-bottom: 20px
}

.ypw-banner .banner-page .prev {
    left: -49px
}

.ypw-banner .banner-page .next {
    right: -49px
}
</style>
