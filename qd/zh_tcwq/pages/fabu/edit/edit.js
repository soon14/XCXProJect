var app = getApp(), _imgArray = [];

Page({
    data: {
        stick_none: !1,
        checked: !1,
        checked_welfare: !1,
        checked_average: !1,
        checked_password: !1,
        know: !1,
        num: 1,
        disabled: !1,
        money1: 0,
        upimgurl:"https://www.xjbmzxlt.cn/api/common/uploadimg"
    },
    bindMultiPickerChange: function(e) {
        this.setData({
            multiIndex: e.detail.value
        });
    },
    bindPickerChange: function(e) {
        var t = this.data.stock[e.detail.value];
        this.setData({
            index: e.detail.value,
            text: t
        });
    },
    onLoad: function(e) {
        console.log(e);
        this.setData({
          gategoryid:e.id,
          gategoryname:e.name
        });
        
        var i = this, t = wx.getStorageSync("users").id;
         wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        })
        var a = e.info, n = e.money, s = e.type_id, o = e.type2_id, c = wx.getStorageSync("System");
        wx.setNavigationBarTitle({
            title: a
        });
        wx.getStorageSync("uniacid");
        console.log(wx.getStorageSync("users")), i.setData({
            type_id: s,
            type2_id: o,
            info: a,
            procedures: Number(c.hb_sxf),
            money: n,
            url: wx.getStorageSync("url2"),
            url1: wx.getStorageSync("url"),
            name: wx.getStorageSync("users").name
        }), wx.getLocation({
            type: "wgs84",
            success: function(e) {
                var t = e.latitude + "," + e.longitude;
                /*app.util.request({
                    url: "entry/wxapp/map",
                    cachetime: "0",
                    data: {
                        op: t
                    },
                    success: function(e) {
                        i.setData({
                            address: e.data.result.address
                        });
                    }
                });*/
            }
        }) /*app.util.request({
            url: "entry/wxapp/Top",
            cachetime: "0",
            success: function(e) {
                var t = e.data;
                for (var a in t) 1 == t[a].type ? t[a].array = "置顶一天（收费" + t[a].money + "元）" : 2 == t[a].type ? t[a].array = "置顶一周（收费" + t[a].money + "元）" : 3 == t[a].type && (t[a].array = "置顶一月（收费" + t[a].money + "元）");
                var n = [];
                t.map(function(e) {
                    var t;
                    t = e.array, n.push(t);
                }), n.push("取消置顶"), i.setData({
                    stock: n,
                    stick: t
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Label",
            cachetime: "0",
            data: {
                type2_id: o
            },
            success: function(e) {
                for (var t in e.data) e.data[t].click_class = "selected1";
                i.setData({
                    label: e.data
                });
            }
        });*/
    },
    selected: function(e) {
        var t = e.currentTarget.id, a = this.data.stick;
        this.setData({
            stick_info: a[t].array,
            money1: a[t].money,
            type: a[t].type,
            checked: !1,
            stick_none: !0
        });
    },
    add: function(e) {
        var a = this;
        wx.chooseLocation({
            type: "wgs84",
            success: function(e) {
                e.latitude, e.longitude, e.speed, e.accuracy;
                var t = e.latitude + "," + e.longitude;
                a.setData({
                    address: e.address,
                    coordinates: t
                });
            }
        });
    },
    label: function(e) {
        var t = this.data.label, a = e.currentTarget.dataset.inde;
        "selected1" == t[a].click_class ? t[a].click_class = "selected2" : "selected2" == t[a].click_class && (t[a].click_class = "selected1"), 
        this.setData({
            label: t
        });
    },
    know: function(e) {
        var t = this.data.know;
        1 == t ? this.setData({
            know: !1
        }) : this.setData({
            know: !0
        });
    },
    imgArray1: function(e) {
      console.log("1");
        var a = this;
        //var n = wx.getStorageSync("uniacid");
        var t = 9 - _imgArray.length;
        0 < t && t <= 9 ? wx.chooseImage({
            count: t,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                });
                var t = e.tempFilePaths;
                a.uploadimg({
                    url: a.data.upimgurl,
                    path: t
                });
            }
        }) : wx.showModal({
            title: "上传提示",
            content: "最多上传9张图片",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    uploadimg: function(e) {
        var t = this, a = e.i ? e.i : 0, n = e.success ? e.success : 0, i = e.fail ? e.fail : 0;
        wx.uploadFile({
            url: e.url,
            filePath: e.path[a],
            name: "img",
            formData: null,
            success: function(e) {
              var res=JSON.parse(e.data);
              console.log(res);
              "" != e.data ? (n++, _imgArray.push("https://www.xjbmzxlt.cn/"+res.msg), t.setData({
                  imgArray1: _imgArray
                })) : wx.showToast({
                    icon: "loading",
                    title: "请重试"
                });
            },
            fail: function(e) {
                i++;
            },
            complete: function() {
                ++a == e.path.length ? (t.setData({
                    images: e.path
                }), wx.hideToast()) : (e.i = a, e.success = n, e.fail = i, t.uploadimg(e));
            }
        });
    },
    delete: function(e) {
        Array.prototype.indexOf = function(e) {
            for (var t = 0; t < this.length; t++) if (this[t] == e) return t;
            return -1;
        }, Array.prototype.remove = function(e) {
            var t = this.indexOf(e);
            -1 < t && this.splice(t, 1);
        };
        var t = e.currentTarget.dataset.inde;
        _imgArray.remove(_imgArray[t]), this.setData({
            imgArray1: _imgArray
        });
    },
    /*switch1Change: function(e) {
        console.log(e.detail.value), e.detail.value || this.setData({
            stick_none: !1,
            money1: 0,
            type: 0
        }), this.setData({
            checked: e.detail.value
        });
    },
    switch2Change: function(e) {
        this.setData({
            checked_welfare: e.detail.value
        });
    },
    switch3Change: function(e) {
        this.setData({
            checked_average: e.detail.value
        });
    },
    switch4Change: function(e) {
        this.setData({
            checked_password: e.detail.value
        });
    },*/
    formSubmit: function(e) {
        console.log("这是保存formid2");
        var t = this, a = wx.getStorageSync("city"), n = t.data.num + 1;
        t.setData({
            num: n
        });
        var i = t.data.money1;
        if ("1" == t.data.System.is_tzdz) var s = e.detail.value.dzaddress; else s = "";
        console.log(s);
        var o = t.data.procedures;
        if (null == t.data.type) var c = 0; else c = t.data.type;
        if (null == i) i = 0; else i = t.data.money1;
        var r = t.data.label, l = [];
        for (var u in r) "selected2" == r[u].click_class && l.push(r[u]);
        var d = [];
        l.map(function(e) {
            var t = {};
            t.label_id = e.id, d.push(t);
        });
        var m = wx.getStorageSync("openid"), p = (e.detail.formId, e.detail.value.content.replace("\n", "↵")), y = e.detail.value.name, f = e.detail.value.tel;
        console.log(f);
        
        if ("" == p ? S = "内容不能为空" : 540 <= p.length ? S = "内容超出了" : "" == y ? S = "姓名不能为空" : "" == f ? S = "电话不能为空" : 1 == k, 
        "" != S) wx.showModal({
            title: "提示",
            content: S,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }); else {
            _ = _;
            o = wx.getStorageSync("System");
            if (0 == _imgArray.length) var I = ""; else I = _imgArray.join(",");
            _ <= 0 ? (t.setData({
                disabled: !0
            }), app.util.request({
                url: "https://www.xjbmzxlt.cn",
                cachetime: "0",
                data: {
                    content:p,
                    username:y,
                    tel:f
                },
                success: function(e) {
                    wx.showToast({
                        title: "发布成功",
                        icon: "",
                        image: "",
                        duration: 2e3,
                        mask: !0,
                        success: function(e) {},
                        fail: function(e) {},
                        complete: function(e) {}
                    }), setTimeout(function() {
                        wx.switchTab({
                            url: "../../index/index",
                            success: function(e) {},
                            fail: function(e) {},
                            complete: function(e) {}
                        });
                    }, 2e3);
                }
            })) : (t.setData({
                disabled: !0
            }), console.log(t.data.money, t.data.money1, T, _, x, Number(t.data.money) + Number(t.data.money1)), 
            app.util.request({
                url: "entry/wxapp/Pay",
                cachetime: "0",
                data: {
                    openid: m,
                    money: _
                },
                success: function(e) {
                    wx.requestPayment({
                        timeStamp: e.data.timeStamp,
                        nonceStr: e.data.nonceStr,
                        package: e.data.package,
                        signType: e.data.signType,
                        paySign: e.data.paySign,
                        success: function(e) {
                            0 < Number(t.data.money) + Number(t.data.money1) && app.util.request({
                                url: "entry/wxapp/fx",
                                cachetime: "0",
                                data: {
                                    user_id: v,
                                    money: Number(t.data.money) + Number(t.data.money1)
                                },
                                success: function(e) {
                                    console.log(e);
                                }
                            }), app.util.request({
                                url: "entry/wxapp/Posting",
                                cachetime: "0",
                                data: {
                                    details: p,
                                    img: I,
                                    user_id: v,
                                    user_name: y,
                                    user_tel: f,
                                    type2_id: h,
                                    type_id: w,
                                    money: _,
                                    type: c,
                                    sz: d,
                                    address: s,
                                    hb_money: T,
                                    hb_keyword: A,
                                    hb_num: N,
                                    hb_type: q,
                                    hb_random: P,
                                    cityname: a
                                },
                                success: function(e) {
                                    0 == x || null == x || "" == x || app.util.request({
                                        url: "entry/wxapp/SaveTzPayLog",
                                        cachetime: "0",
                                        data: {
                                            tz_id: e.data,
                                            money: _,
                                            money1: t.data.money,
                                            money2: t.data.money1,
                                            money3: T
                                        },
                                        success: function(e) {}
                                    }), wx.showToast({
                                        title: "发布成功",
                                        icon: "",
                                        image: "",
                                        duration: 2e3,
                                        mask: !0,
                                        success: function(e) {},
                                        fail: function(e) {},
                                        complete: function(e) {}
                                    }), setTimeout(function() {
                                        wx.switchTab({
                                            url: "../../index/index",
                                            success: function(e) {},
                                            fail: function(e) {},
                                            complete: function(e) {}
                                        });
                                    }, 2e3);
                                }
                            });
                        },
                        fail: function(e) {
                            wx.showToast({
                                title: "支付失败",
                                duration: 1e3
                            });
                        },
                        complete: function(e) {
                            console.log(e), "requestPayment:fail cancel" == e.errMsg && (wx.showToast({
                                title: "取消支付",
                                icon: "loading",
                                duration: 1e3
                            }), t.setData({
                                disabled: !1
                            }));
                        }
                    });
                }
            }));
        }
    },
    cancel: function(e) {
        this.setData({
            money1: 0,
            type: 0,
            checked: !1,
            stick_none: !1,
            iszdchecked: !1
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        console.log(this.data), _imgArray.splice(0, _imgArray.length);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
