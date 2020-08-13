<template>
  <div class="calendar-root-view">
    <input readonly ref="myinput" type="text" />
    <div ref="mycalendar" class="calendar-view">
      <!-- 日历组件切换视图的地方 -->
    </div>
  </div>
</template>

<script>
import $date from "../services/$date";
import $$ from "image2d";

export default {
  props: ["value"],
  data() {
    return {
      //   选择的日期
      selectYear: -1,
      selectMonth: -1,
      selectDay: -1,
      //   记录日历是否打开了
      isOpen: false,
      //   今天
      todayYear: -1,
      todayMonth: -1,
      todayDay: -1,
    };
  },
  methods: {
    doit(year, month, day) {
      // debugger
      this.$emit("input", `${year}${month}${day}`);
    },
    // 选择天视图
    selectDayView(year, month) {
      // 头部分
      let template = `
    <div class="header"> 
       <div class="left">&lt;</div> 
       <div class="title">
        ${year}  年  ${month}  月
       </div>
       <div class="right">&gt;</div> 
    </div>
    `;
      template += "<div class='container day-view'><ul>";

      ["日", "一", "二", "三", "四", "五", "六"].forEach(function (val) {
        template += "<li class='none item'>" + val + "</li>";
      });

      // 前置灰色
      $date.getPreDayArray(year, month).forEach(function (val) {
        template += "<li class='none item gray'>" + val + "</li>";
      });

      // 内容主体部分
      let days = $date.getMonthDays(year, month);
      for (let i = 1; i <= days; i++) {
        let clazz = "click item";
        if (
          year == this.selectYear &&
          month == this.selectMonth &&
          i == this.selectDay
        ) {
          clazz += " selected";
        }
        if (
          year == this.todayYear &&
          month == this.todayMonth &&
          i == this.todayDay
        ) {
          clazz += " today";
        }
        template += `<li class='${clazz}'  val='${i}'>${i}</li>`;
      }

      // 后置灰色s
      $date.getNextDayArray(year, month).forEach(function (val) {
        template += "<li class='none item gray'>" + val + "</li>";
      });

      template += "</ul></div>";

      this.$refs.mycalendar.innerHTML = template;

      // 点击上个月按钮
      $$(".left", this.$refs.mycalendar).bind("click", () => {
        if (month == 1) {
          month = 12;
          year -= 1;
        } else {
          month -= 1;
        }
        this.selectDayView(year, month);
      });

      // 点击标题进入选择月视图
      $$(".title", this.$refs.mycalendar).bind("click", () => {
        this.selectMonthView(year);
      });

      // 点击下个月按钮
      $$(".right", this.$refs.mycalendar).bind("click", () => {
        if (month == 12) {
          year -= -1;
          month = 1;
        } else {
          month = parseInt(month) + 1;
        }
        this.selectDayView(year, month);
      });

      // 点击天按钮
      $$(".click", this.$refs.mycalendar).bind("click", (event) => {
        // debugger;
        let day = event.target.getAttribute("val");
        if (day.length <= 1) {
          day = "0" + event.target.getAttribute("val");
        }
        this.selectYear = year;
        this.selectMonth = month;
        this.selectDay = day;
        this.$refs.myinput.value = `${year}年${month}月${day}日`;
        this.doit(year, month, day);
        this.$refs.mycalendar.innerHTML = "";
        this.isOpen = false;
      });
    },
    // 选择月视图
    selectMonthView(year) {
      // 头部分
      let template =
        '<div class="header">' +
        '   <div class="left" >&lt;</div>' +
        '   <div class="title" >' +
        year +
        "年</div>" +
        '   <div class="right" >&gt;</div>' +
        "</div>";

      template += "<div class='container month-view'><ul>";

      // 内容部分
      for (let i = 1; i <= 12; i++) {
        let clazz = "click item";
        if (year == this.selectYear && i == this.selectMonth) {
          clazz += " selected";
        }
        template += "<li class='" + clazz + "' val='" + i + "'>" + i + "</li>";
      }

      template += "</ul></div>";

      this.$refs.mycalendar.innerHTML = template;

      // 点击上一年按钮
      $$(".left", this.$refs.mycalendar).bind("click", () => {
        this.selectMonthView(year - 1);
      });
      // 点击标题按钮
      $$(".title", this.$refs.mycalendar).bind("click", () => {
        this.selectYearView(year);
      });
      // 点击下一年按钮
      $$(".right", this.$refs.mycalendar).bind("click", () => {
        this.selectMonthView(year - -1);
      });
      // 点击月按钮
      $$(".click", this.$refs.mycalendar).bind("click", (event) => {
        this.selectDayView(
          year,
          event.target.getAttribute("val").length <= 1
            ? "0" + event.target.getAttribute("val")
            : event.target.getAttribute("val")
        );
      });
    },
    // 选择年视图
    selectYearView(year) {
      let decYears = $date.getDecYears(year);
      // 头部分
      let template =
        '<div class="header">' +
        '   <div class="left" >&lt;</div>' +
        '   <div class="title">' +
        decYears[0] +
        " - " +
        decYears[9] +
        "</div>" +
        '   <div class="right" >&gt;</div>' +
        "</div>";

      // 内容部分
      template += "<div class='container year-view'><ul>";

      template += "<li class='none item gray'>" + (decYears[0] - 1) + "</li>";
      for (let i = 0; i < decYears.length; i++) {
        let clazz = "click item";
        if (decYears[i] == this.selectYear) {
          clazz += " selected";
        }
        template +=
          "<li class='" +
          clazz +
          "'  val='" +
          decYears[i] +
          "'>" +
          decYears[i] +
          "</li>";
      }
      template += "<li class='none item gray'>" + (decYears[9] + 1) + "</li>";

      template += "</ul></div>";

      this.$refs.mycalendar.innerHTML = template;

      //   点击上十年按钮
      $$(".left", this.$refs.mycalendar).bind("click", () => {
        this.selectYearView(year - 10);
      });
      //   点击下十年按钮
      $$(".right", this.$refs.mycalendar).bind("click", () => {
        this.selectYearView(year - -10);
      });
      //   点击年按钮
      $$(".click", this.$refs.mycalendar).bind("click", (event) => {
        this.selectMonthView(event.target.getAttribute("val"));
      });
    },
  },
  mounted() {
    (this.selectYear = this.value.substr(0, 4)),
      (this.selectMonth = this.value.substr(4, 2)),
      (this.selectDay = this.value.substr(6, 2));

    this.$refs.myinput.value = `${this.selectYear}年${this.selectMonth}月${this.selectDay}日`;
    // 初始化今天
    const today = new Date();
    this.todayYear = today.getFullYear();
    this.todayMonth = today.getMonth() + 1;
    this.todayDay = today.getDate();

    //   初始化输入框点击方法
    $$(this.$refs.myinput).bind("click", () => {
      if (this.isOpen) {
        // 关闭
      } else {
        // 打开
        this.selectDayView(this.selectYear, this.selectMonth);
        this.isOpen = true;
      }
    });
  },
};
</script>
<style lang="scss">
/**
----------------------------------------
 日历组件样式
----------------------------------------
*/
.calendar-root-view {
  display: inline-block;
  & > input {
    cursor: pointer;
    background-image: url("../assets/zdj.jpg");
    background-size: auto 70%;
    background-repeat: no-repeat;
    background-position: right center;
  }
}

.calendar-view {
  position: absolute;
  width: 210px;
  user-select: none;
  background-color: rgb(233, 239, 241);
  line-height: 1.8em;
  text-align: center;
  box-shadow: 1px 2px 3px #79798d;
  z-index: 1;
  // background-image: url("../assets/zdj.jpg");
}

/* 头部 */

.calendar-view > .header > div {
  display: inline-block;
  cursor: pointer;
}

.calendar-view > .header > div.title {
  width: 165px;
}

/* 内容 */
.calendar-view > .container.day-view > ul > li {
  width: 29px;
}

.calendar-view > .container.month-view > ul > li,
.calendar-view > .container.year-view > ul > li {
  width: 52px;
  line-height: 2.4em;
}

.calendar-view > .container > ul > li {
  display: inline-block;
}

.calendar-view > .container > ul > li.click {
  cursor: pointer;
}

.calendar-view > .container > ul > li.none {
  cursor: no-drop;
}

.calendar-view > .container > ul > li.gray {
  color: gray;
}

.calendar-view > .container > ul > li.click.today {
  background-color: rgb(251, 214, 2);
}

.calendar-view > .container > ul > li.click.selected {
  background-color: rgb(21, 199, 243);
}

.calendar-view > .container > ul > li:hover {
  background-color: rgb(185, 233, 245);
}
</style>