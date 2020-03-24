// ==UserScript==
// @name         BV to AV converter
// @namespace    none
// @version      3.24.20
// @description  BV to AV converter
// @author       Jerry Li
// @require      https://unpkg.com/ajax-hook@2.0.0/dist/ajaxhook.min.js
// @match        https://www.bilibili.com/video/*
// @match        https://acg.tv/*
// @match        https://b23.tv/*
// @grant        none
// ==/UserScript==

if(window.location.href.match(/.*bilibili.com\/video\/BV.*/)){
    var url = "https://www.bilibili.com/video/av"+window.__INITIAL_STATE__.aid;
    window.location.href=url;
    console.log("BV go to hell");
}
var is_finished_ajax = false;
var is_av_number_written = false;
ah.proxy({
    onRequest: (config, handler) => {
        if(config.url.indexOf("first_video_frame_decoded")!=-1){
        //console.log(config.url)
            is_finished_ajax = true;
        }
        handler.next(config);
    },

    onResponse: (response, handler) => {
        //console.log(response.response)
        if(is_finished_ajax && !is_av_number_written){
            document.getElementsByClassName("video-data")[0].innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;<span>av"+window.__INITIAL_STATE__.aid+"</span>";
            is_av_number_written = true;
        }
        handler.next(response)
    }
})
//Have fun :)
