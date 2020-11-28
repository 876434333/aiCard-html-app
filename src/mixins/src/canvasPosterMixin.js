import wepy from 'wepy'

export default class canvasPosterMixin extends wepy.mixin {
  // 名片样式1
  drawCardTypeOne(staff, ctx) {
    ctx.setFontSize(28)
    ctx.setFillStyle('#646464')
    this.textWrap(ctx, staff.enterprise_name, 30, 310, 58.25, 78)

    ctx.setFontSize(20)
    ctx.drawImage('/assets/images/card/phone.png', 58.25, 174, 40, 40)
    ctx.fillText(staff.phone, 112.25, 202)

    ctx.drawImage('/assets/images/card/mail.png', 58.25, 224, 40, 40)
    ctx.fillText(staff.mail, 112.25, 252)

    ctx.setFontSize(26)
    ctx.setFillStyle('#ffdd15')
    ctx.fillText(staff.name, 374.4 + ((278.1 - ctx.measureText(staff.name).width) / 2), 266)

    ctx.setFontSize(16)
    ctx.fillText(staff.station, 374.4 + ((278.1 - ctx.measureText(staff.station).width) / 2), 293)
    ctx.save()
    ctx.arc(513.45, 170, 56, 0, 2 * Math.PI, false)
    // 调试圆 Start
    ctx.setFillStyle('#252731')
    ctx.fill()
    // 调试圆 End
    ctx.clip()
    ctx.drawImage(staff.tmp_head_icon, 457.45, 114, 112, 112)
    ctx.restore()
  }
  // 名片样式3
  drawCardTypeThree(staff, ctx) {
    ctx.setFontSize(28)
    ctx.setFillStyle('#ab8055')
    this.textWrap(ctx, staff.enterprise_name, 30, 340, 60, 100)

    ctx.setFontSize(20)
    ctx.setFillStyle('#f9c898')
    ctx.drawImage('/assets/images/card/tel_3.png', 60, 210, 21, 29)
    ctx.fillText(staff.phone, 98, 234)

    ctx.drawImage('/assets/images/card/email_3.png', 60, 258, 26, 20)
    ctx.fillText(staff.mail, 98, 276)

    ctx.setFontSize(26)
    ctx.fillText(staff.name, 60, 174)

    ctx.setFillStyle('#c79664')
    ctx.setFontSize(16)
    let nameX = ctx.measureText(staff.name).width
    ctx.fillText(staff.station, 58 + nameX * 2, 174)
    ctx.save()
    ctx.arc(554, 110, 56, 0, 2 * Math.PI, false)
    // 调试圆 Start
    ctx.setFillStyle('#252731')
    ctx.fill()
    // 调试圆 End
    ctx.clip()
    ctx.drawImage(staff.tmp_head_icon, 498, 54, 112, 112)
    ctx.restore()
  }
  // 名片样式4
  drawCardTypeFour(staff, ctx) {
    ctx.setFontSize(28)
    ctx.setFillStyle('#323232')
    this.textWrap(ctx, staff.enterprise_name, 30, 350, 96, 106)

    ctx.setFontSize(20)
    ctx.drawImage('/assets/images/card/tel_4.png', 96, 226, 21, 29)
    ctx.fillText(staff.phone, 136, 248)

    ctx.drawImage('/assets/images/card/email_4.png', 96, 270, 26, 20)
    ctx.fillText(staff.mail, 136, 288)

    ctx.setFontSize(26)
    ctx.fillText(staff.name, 96, 180)

    ctx.setFillStyle('#646464')
    ctx.setFontSize(16)
    let nameX = ctx.measureText(staff.name).width
    ctx.fillText(staff.station, 96 + nameX * 2, 180)
    ctx.save()
    ctx.arc(546, 116, 56, 0, 2 * Math.PI, false)
    // 调试圆 Start
    ctx.setFillStyle('#252731')
    ctx.fill()
    // 调试圆 End
    ctx.clip()
    ctx.drawImage(staff.tmp_head_icon, 490, 60, 112, 112)
    ctx.restore()
  }
  // 名片样式5
  drawCardTypeFive(staff, ctx) {
    ctx.setFontSize(28)
    ctx.setFillStyle('#17627e')
    this.textWrap(ctx, staff.enterprise_name, 30, 400, 60, 194)

    ctx.setFontSize(20)
    ctx.drawImage('/assets/images/card/tel_5.png', 60, 240, 21, 29)
    ctx.fillText(staff.phone, 98, 264)

    ctx.drawImage('/assets/images/card/email_5.png', 60, 288, 26, 20)
    ctx.fillText(staff.mail, 98, 306)

    ctx.setFontSize(26)
    ctx.fillText(staff.name, 420 + ((278.1 - ctx.measureText(staff.name).width) / 2), 195)    

    ctx.setFontSize(16)
    ctx.fillText(staff.station, 420 + ((278.1 - ctx.measureText(staff.station).width) / 2), 222)
    ctx.save()
    ctx.arc(558, 106, 56, 0, 2 * Math.PI, false)
    // 调试圆 Start
    ctx.fill()
    // 调试圆 End
    ctx.clip()
    ctx.drawImage(staff.tmp_head_icon, 502, 50, 112, 112)
    ctx.restore()
  }
  // 名片样式6
  drawCardTypeSix(staff, ctx) {
    ctx.setFontSize(28)
    ctx.setFillStyle('#323232')
    this.textWrap(ctx, staff.enterprise_name, 30, 400, 60, 134)

    ctx.setFontSize(20)
    ctx.drawImage('/assets/images/card/tel_6.png', 60, 184, 21, 29)
    ctx.fillText(staff.phone, 98, 208)

    ctx.drawImage('/assets/images/card/email_6.png', 60, 232, 26, 20)
    ctx.fillText(staff.mail, 98, 250)

    ctx.setFontSize(26)
    ctx.fillText(staff.name, 414 + ((278.1 - ctx.measureText(staff.name).width) / 2), 199)    

    ctx.setFontSize(16)
    ctx.setFillStyle('#646464')
    ctx.fillText(staff.station, 414 + ((278.1 - ctx.measureText(staff.station).width) / 2), 226)
    ctx.save()
    ctx.arc(554, 110, 56, 0, 2 * Math.PI, false)
    // 调试圆 Start
    ctx.fill()
    // 调试圆 End
    ctx.clip()
    ctx.drawImage(staff.tmp_head_icon, 498, 54, 112, 112)
    ctx.restore()
  }
  // 名片样式7
  drawCardTypeSeven(staff, ctx) {
    ctx.setFontSize(28)
    ctx.setFillStyle('#323232')
    this.textWrap(ctx, staff.enterprise_name, 30, 340, 264, 104)

    ctx.setFontSize(20)
    ctx.drawImage('/assets/images/card/tel_7.png', 264, 204, 21, 29)
    ctx.fillText(staff.phone, 302, 228)

    ctx.drawImage('/assets/images/card/email_7.png', 264, 252, 26, 20)
    ctx.fillText(staff.mail, 302, 270)

    ctx.setFontSize(26)
    ctx.fillText(staff.name, 264, 174)

    ctx.setFontSize(16)
    let nameX = ctx.measureText(staff.name).width
    ctx.setFillStyle('#646464')
    ctx.fillText(staff.station, 262 + nameX * 2, 174)
    ctx.save()
    ctx.arc(140, 256, 56, 0, 2 * Math.PI, false)
    // 调试圆 Start
    ctx.fill()
    // 调试圆 End
    ctx.clip()
    ctx.drawImage(staff.tmp_head_icon, 94, 200, 112, 112)
    ctx.restore()
  }
  // 名片样式8
  drawCardTypeEight(staff, ctx) {
    ctx.setFontSize(28)
    ctx.setFillStyle('#ffffff')
    this.textWrap(ctx, staff.enterprise_name, 30, 400, 60, 122)

    ctx.setFontSize(20)
    ctx.drawImage('/assets/images/card/tel_8.png', 60, 218, 21, 29)
    ctx.fillText(staff.phone, 98, 242)

    ctx.drawImage('/assets/images/card/email_8.png', 60, 266, 26, 20)
    ctx.fillText(staff.mail, 98, 284)

    ctx.setFontSize(26)
    ctx.fillText(staff.name, 60, 190)

    ctx.setFontSize(16)
    let nameX = ctx.measureText(staff.name).width
    ctx.fillText(staff.station, 58 + nameX * 2, 190)
    ctx.save()
    ctx.arc(554, 138, 56, 0, 2 * Math.PI, false)
    // 调试圆 Start
    ctx.fill()
    // 调试圆 End
    ctx.clip()
    ctx.drawImage(staff.tmp_head_icon, 498, 82, 112, 112)
    ctx.restore()
  }
  // 名片样式9
  drawCardTypeNine(staff, ctx) {
    ctx.setFontSize(28)
    ctx.setFillStyle('#2d365c')
    this.textWrap(ctx, staff.enterprise_name, 30, 310, 272, 90)

    ctx.setFontSize(20)
    ctx.drawImage('/assets/images/card/tel_9.png', 274, 174, 21, 29)
    ctx.fillText(staff.phone, 312, 198)

    ctx.drawImage('/assets/images/card/email_9.png', 274, 216, 26, 20)
    ctx.fillText(staff.mail, 312, 234)

    ctx.setFontSize(26)
    ctx.fillText(staff.name, 274, 152)

    ctx.setFontSize(16)
    let nameX = ctx.measureText(staff.name).width
    ctx.fillText(staff.station, 272 + nameX * 2, 152)
    ctx.save()
    ctx.arc(134, 112, 56, 0, 2 * Math.PI, false)
    // 调试圆 Start
    ctx.fill()
    // 调试圆 End
    ctx.clip()
    ctx.drawImage(staff.tmp_head_icon, 88, 56, 112, 112)
    ctx.restore()
  }
  // 名片样式10
  drawCardTypeTen(staff, ctx) {
    ctx.setFontSize(28)
    ctx.setFillStyle('#006f1f')
    this.textWrap(ctx, staff.enterprise_name, 30, 370, 230, 186)

    ctx.setFontSize(20)
    ctx.drawImage('/assets/images/card/tel_10.png', 230, 234, 21, 29)
    ctx.fillText(staff.phone, 268, 258)

    ctx.drawImage('/assets/images/card/email_10.png', 230, 282, 26, 20)
    ctx.fillText(staff.mail, 268, 300)

    ctx.setFontSize(26)
    ctx.fillText(staff.name, (272.1 - ctx.measureText(staff.name).width) / 2, 199)    

    ctx.setFontSize(16)
    ctx.fillText(staff.station, (272.1 - ctx.measureText(staff.station).width) / 2, 226)
    ctx.save()
    ctx.arc(130, 110, 56, 0, 2 * Math.PI, false)
    // 调试圆 Start
    ctx.fill()
    // 调试圆 End
    ctx.clip()
    ctx.drawImage(staff.tmp_head_icon, 74, 54, 112, 112)
    ctx.restore()
  }
  // 名片样式11
  drawCardTypeEleven(staff, ctx) {
    ctx.setFontSize(28)
    ctx.setFillStyle('#323232')
    this.textWrap(ctx, staff.enterprise_name, 30, 250, 190, 116)

    ctx.setFontSize(20)
    ctx.drawImage('/assets/images/card/tel_6.png', 190, 212, 21, 29)
    ctx.fillText(staff.phone, 228, 236)

    ctx.drawImage('/assets/images/card/email_6.png', 190, 260, 26, 20)
    ctx.fillText(staff.mail, 228, 278)

    ctx.setFontSize(26)
    ctx.fillText(staff.name, 190, 184)

    ctx.setFontSize(16)
    let nameX = ctx.measureText(staff.name).width
    ctx.fillText(staff.station, 188 + nameX * 2, 184)
    ctx.save()
    ctx.arc(554, 118, 56, 0, 2 * Math.PI, false)
    // 调试圆 Start
    ctx.fill()
    // 调试圆 End
    ctx.clip()
    ctx.drawImage(staff.tmp_head_icon, 498, 62, 112, 112)
    ctx.restore()
  }
  // 绘制地址
  drawAddress(staff, temlateId, ctx) {
    ctx.setFontSize(20)
    if (temlateId === 1) {
      ctx.drawImage('/assets/images/card/address.png', 58.25, 274, 40, 40)
      ctx.setFillStyle('#646464')
      this.textWrap(ctx, staff.address, 30, 191, 112.25, 302)
    } else if (temlateId === 3) {
      ctx.drawImage('/assets/images/card/address_3.png', 64, 296, 17, 26)
      ctx.setFillStyle('#f9c898')
      this.textWrap(ctx, staff.address, 24, 450, 98, 318)
    } else if (temlateId === 4) {
      ctx.drawImage('/assets/images/card/address_4.png', 100, 312, 17, 26)
      ctx.setFillStyle('#323232')
      this.textWrap(ctx, staff.address, 24, 380, 136, 332)
    } else if (temlateId === 5) {
      ctx.drawImage('/assets/images/card/address_5.png', 64, 326, 17, 26)
      ctx.setFillStyle('#17627e')
      this.textWrap(ctx, staff.address, 24, 350, 98, 348)
    } else if (temlateId === 6) {
      ctx.drawImage('/assets/images/card/address_6.png', 64, 270, 17, 26)
      ctx.setFillStyle('#323232')
      this.textWrap(ctx, staff.address, 24, 320, 98, 292)
    } else if (temlateId === 7) {
      ctx.drawImage('/assets/images/card/address_7.png', 268, 290, 17, 26)
      ctx.setFillStyle('#323232')
      this.textWrap(ctx, staff.address, 24, 320, 302, 312)
    } else if (temlateId === 8) {
      ctx.drawImage('/assets/images/card/address_8.png', 64, 304, 17, 26)
      this.textWrap(ctx, staff.address, 24, 390, 98, 326)
    } else if (temlateId === 9) {
      ctx.drawImage('/assets/images/card/address_9.png', 278, 248, 17, 26)
      this.textWrap(ctx, staff.address, 24, 280, 312, 270)
    } else if (temlateId === 10) {
      ctx.drawImage('/assets/images/card/address_10.png', 234, 320, 17, 26)
      this.textWrap(ctx, staff.address, 24, 340, 268, 342)
    } else if (temlateId === 11) {
      ctx.drawImage('/assets/images/card/address_6.png', 194, 298, 17, 26)
      this.textWrap(ctx, staff.address, 24, 250, 232, 318)
    }
  }
  // 文字换行
  textWrap(ctx, text, lineHeight, wrapW, textX, textY) {
    if (ctx.measureText(text).width > wrapW) {
      let result = []
      let line = 0
      let tmp = ''
      for (let key in text) {
        tmp += text.substr(key, 1)
        if (ctx.measureText(tmp).width > wrapW) {
          result[line] = tmp
          line++
          tmp = ''
        }
      }
      result[line] = tmp
      for (let k in result) {
        if (k < 2) {
          ctx.fillText(result[k], textX, textY + (lineHeight * k))
        } else {
          break
        }
      }
    } else {
      ctx.fillText(text, textX, textY)
    }
  }
  // canvas添加去查看按钮
  drawViewButton(ctx) {
    let x = 170
    let y = 430
    let w = 310
    let h = 60
    let r = 10
    // 开始绘制
    ctx.beginPath()
    // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
    // 这里是使用 fill 还是 stroke都可以，二选一即可
    ctx.setFillStyle('#e75152')
    // ctx.setStrokeStyle('transparent')
    // 左上角
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
    // border-top
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.lineTo(x + w, y + r)
    // 右上角
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
    // border-right
    ctx.lineTo(x + w, y + h - r)
    ctx.lineTo(x + w - r, y + h)
    // 右下角
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
    // border-bottom
    ctx.lineTo(x + r, y + h)
    ctx.lineTo(x, y + h - r)
    // 左下角
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
    // border-left
    ctx.lineTo(x, y + r)
    ctx.lineTo(x + r, y)
    // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
    ctx.fill()
    // ctx.stroke()
    ctx.closePath()

    ctx.setFontSize(30)
    ctx.setFillStyle('#ffffff')
    let c = `点击查看`
    ctx.fillText(c, (660 - ctx.measureText(c).width) / 2, 470)
  }
}
