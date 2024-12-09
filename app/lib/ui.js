const ui = {
    init: function(){
        this.viewport.init.evt();
        console.log("ui.init");
    },
    e:1,
    aaa:function(){
        console.log("dsfafsafdsffsafasfdfas");
    },
    error:{
        poster: e => e.target.src=`${import.meta.env.VITE_APP_PUBLIC_URL}img/common/non_poster.png`,
        user: e => e.target.src=`${import.meta.env.VITE_APP_PUBLIC_URL}img/common/user.png`
    },
    iosx:{ // 아이폰X 여백값
        top: ()=>    parseInt(getComputedStyle(document.documentElement).getPropertyValue("--safe-top").replace(/[^0-9]/g, "")) || 0 ,
        bottom: ()=> parseInt(getComputedStyle(document.documentElement).getPropertyValue("--safe-bottom").replace(/[^0-9]/g, "")) || 0
    },
    viewport: {
        init: {
            evt: function(){
                window.addEventListener("load", this.set );
                window.addEventListener("resize", this.set );
            },
            set: ()=> document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01+"px")
        },
        height: () => parseInt(window.visualViewport ? visualViewport.height : window.innerHeight),
        width: () => parseInt(window.visualViewport ? visualViewport.width : window.innerWidth),
        docHeight: () => parseInt(document.documentElement.scrollHeight || document.body.clientHeight),
        scrollTop: () => parseInt(document.documentElement.scrollTop)
    },
    postIsMod: function(createdTime, modifiedTime) {
        const created = new Date(createdTime);
        const modified = new Date(modifiedTime);       
        const timeDifference = modified - created;
        return timeDifference >= 10000;
    }
    ,  
    dateForm: (date, opt = 'medium')=> {
        date = new Date(date);
        return new Intl.DateTimeFormat('ko-KR', { dateStyle: opt, timeStyle: opt }).format(date);
    },
    timeForm: function (date, opt) {
        const start = new Date(date);
        const end = new Date(); // 현재 날짜
        const diff = (end - start) / 1000; // 경과 시간
        const times = [
            { name: '년', milliSeconds: 60 * 60 * 24 * 365, icon: 'calendar-days' },
            { name: '개월', milliSeconds: 60 * 60 * 24 * 30, icon: 'calendar-days' },
            { name: '일', milliSeconds: 60 * 60 * 24, icon: 'calendar-days' },
            { name: '시간', milliSeconds: 60 * 60, icon: 'clock' },
            { name: '분', milliSeconds: 60, icon: 'clock' },
        ];
        // 년 단위부터 알맞는 단위 찾기
        for (const value of times) {
            const betweenTime = Math.floor(diff / value.milliSeconds);
            // 큰 단위는 0보다 작은 소수 단위 나옴
            if (betweenTime > 0) {
                if (opt == true) {
                    return `${betweenTime}${value.name} 전`;
                } else {
                    return `${value.icon} <b>${betweenTime}${value.name} 전</b>`;
                }
            }
        }
        // 모든 단위가 맞지 않을 시
        return "방금 전";
    },
    textHtml: (text, opt) => {
        // console.log(text,opt);
        if (opt == 'incode') { return text.replace(/\u0020/g, '&nbsp;').replace(/\n/g, '<br>'); }
        if (opt == 'decode') { return text.replace(/<br>/ig, '\n').replace(/&nbsp;/g, '\u0020'); }
    },
    getSafe:{
        top: ()=> parseInt( getComputedStyle(document.documentElement).getPropertyValue("--safe-top")  ) || 0 ,
        bottom: ()=> parseInt( getComputedStyle(document.documentElement).getPropertyValue("--safe-bottom")  ) || 0,
        watch: ()=> parseInt( getComputedStyle(document.documentElement).getPropertyValue("--safe-watch")  ) || 0
    },
    commas:{
        add: (str)=> str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ,
        del: (str)=> parseInt(str.replace(/,/g , ''))
    },
    numToCommaHan : function(num) {
        var number = ["영", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
		num = num + "";
		number = parseInt(num.replace(/,/gi, ""));
		// console.log(">>>>>>in:one:", number);
		let inputNumber  = number < 0 ? false : number;
		let unitWords    = ['', '만', '억', '조', '경']
		let splitUnit    = 10000;
		let splitCount   = unitWords.length;
		let resultArray  = [];
		let resultString = '';
		for(let i = 0; i < splitCount; i++) {
			let unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
			unitResult = Math.floor(unitResult);
			if(unitResult > 0) {
				resultArray[i] = unitResult;
			}
		}
		for(let i = 0; i < resultArray.length; i++) {
			if(!resultArray[i]) continue;
			let numWithComma = (resultArray[i]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			resultString = String(numWithComma) + unitWords[i] + resultString;
		}
		return resultString;
	},
    makeHan : function(text) {
        var number = ["영", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
        var smallUnit = ["천", "백", "십", ""];
		var str = "";
		for(var i=0; i < text.length; i++) {
			var num = text[i];
			// '0' 은 읽지 않음
			if (num == "0") continue;
			str += number[num] + smallUnit[i];
		}

		return str;
	},
    scrollTo: (selector, position, duration, callback) => {
        // ui.scrollTo(boxElement, 100, 200, () => {
        //     console.log(".box 도착");
        // });
        const element = document.querySelector(selector);
        if (!element) return;
        console.log(element);
        const startingYOffset = element.scrollTop || document.documentElement.scrollTop;
        const targetYOffset = position;
        const startTime = performance.now();

        const animateScroll = (timestamp) => {
            const currentTime = timestamp - startTime;
            const progress = Math.min(currentTime / duration, 1);
            const easeInOutCubic = progress < 0.5 ? 4 * progress * progress * progress : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
            const yOffset = startingYOffset + (targetYOffset - startingYOffset) * easeInOutCubic;

            if (element === document.body) {
                window.scrollTo(0, yOffset);
            }else{
                element.scrollTop = yOffset;
            }

            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            }else{
                if (typeof callback === 'function') {
                    callback();
                }
            }
        };

        requestAnimationFrame(animateScroll);
    },
    popup:{
        evt:function(){
            
        },
        resize:function(){
            
            let $pop =  document.querySelector(".pop-layer");
            let pctnH =  $pop.offsetHeight || 0;
            let pbtnH =  $pop.querySelector(".pbt")?.offsetHeight || 0 ;
            let phtnH =  $pop.querySelector(".phd")?.offsetHeight || 0 ;
            pctnH = (pctnH - phtnH) || 0 ;
            console.log(pctnH  );
            $pop.querySelector(".pct").style.maxHeight = pctnH - pbtnH+"px" ; 
        
        }
    },
    // elip:{ // 5줄이상 내용더보기 
	// 	init:function(){
	// 		this.evt();
	// 		this.set();
	// 	},
	// 	evt:function(){
	// 		$(document).on("click", "[data-ui='elips'] .btn-tog", function() {
	// 			if ($(this).closest("[data-ui='elips']").hasClass("open")) {
	// 				$(this).closest("[data-ui='elips']").removeClass("open");
	// 				$(this).text("내용더보기");
	// 			} else {
	// 				$(this).closest("[data-ui='elips']").addClass("open");
	// 				$(this).text("내용닫기");
	// 			}
	// 		});
	// 	},
	// 	set:function(){
	// 		$("[data-ui='elips']").each(function(){
	// 			var txtH = $(this).find(".txt");
				
	// 			if(txtH.height()>105){
	// 				txtH.closest("[data-ui='elips']").addClass("elips");
	// 			}else{
	// 				txtH.closest("[data-ui='elips']").removeClass("elips");
	// 			}
	// 		});
	// 	}
	// },
    alert: function (msg, params) { // 커스텀 알럿

        let opt = Object.assign({
            msg: msg,
            tit: "",
            cls: "",
            ycb: "",
            ybt: "확인"
        }, params);

        if (document.querySelectorAll(".ui-alert").length) return;

        ui.lock.using(true);
        // console.log(opt.tit);

        var lyAlert =
            `<article class="ui-alert ${opt.cls}" tabindex="0">
            <div class="pbd">
                <div class="phd"><span class="ptit">${opt.tit}</span></div>
                <div class="pct"><div class="msg">${opt.msg}</div></div>
                <div class="pbt">
                    <button type="button" class="btn btn-confirm">${opt.ybt}</button>
                </div>
                <!-- <button type="button" class="btn-close"><i class="fa-regular fa-xmark"></i></button> -->
            </div>
        </article>`;
        const body = document.querySelector("body");
        body.insertAdjacentHTML("beforeend", lyAlert);

        const uiAlert = document.querySelector(".ui-alert");
        body.classList.add("is-alert");
        setTimeout(() => uiAlert.classList.add("open"));
        if (opt.tit) {
            uiAlert.querySelector(".pbd>.phd").classList.add("is-tit");
        }
          

        uiAlert.focus();
        uiAlert.querySelector(".btn-confirm").addEventListener("click", () => window.setTimeout(opt.ycb));

        uiAlert.querySelectorAll(".btn-confirm, .btn-close").forEach((btn) => { btn.addEventListener("click", alertClose); })
        // $(".ui-alert").find(".btn-close , .btn-confirm").on("click",alertClose);

        function alertClose() {
            uiAlert.remove();
            body.classList.remove("is-alert");
            if (document.querySelectorAll(".pop-layer").length < 1) {
                ui.lock.using(false);
            }
        }
    },
    confirm: function (msg, params) { // 커스텀 컨펌

        let opt = Object.assign({
            msg: msg,
            tit: "",
            cls: "",
            ycb: "",
            ybt: "확인",
            ncb: "",
            nbt: "취소"
        }, params);

        if (document.querySelectorAll(".ui-confirm").length) return;

        ui.lock.using(true);

        let lyConfirm =
        `<article class="ui-alert ${opt.cls}" tabindex="0">
            <div class="pbd">
                <div class="phd"><span class="ptit">${opt.tit}</span></div>
                <div class="pct"><div class="msg">${opt.msg}</div></div>
                <div class="pbt">
                    <button type="button" class="btn btn-cancel">${opt.nbt}</button>
                    <button type="button" class="btn btn-confirm">${opt.ybt}</button>
                </div>
                <!-- <button type="button" class="btn-close"><i class="fa-regular fa-xmark"></i></button> -->
            </div>
        </article>`;
        const body = document.querySelector("body");
        body.insertAdjacentHTML("beforeend", lyConfirm);

        const uiConfirm = document.querySelector(".ui-alert");
        body.classList.add("is-confrim");
        setTimeout(() => uiConfirm.classList.add("open"));
        if (opt.tit) {
            uiConfirm.querySelector(".pbd>.phd").classList.add("is-tit");
        }
        uiConfirm.focus();
        uiConfirm.querySelector(".btn-confirm").addEventListener("click", () => window.setTimeout(opt.ycb));
        uiConfirm.querySelector(".btn-cancel").addEventListener("click", () => window.setTimeout(opt.ncb));

        uiConfirm.querySelectorAll(".btn-confirm, .btn-close , .btn-cancel").forEach((btn) => { btn.addEventListener("click", confirmClose); })

        function confirmClose() {
            uiConfirm.remove();
            body.classList.remove("is-confrim");
            if (document.querySelectorAll(".pop-layer").length < 1) {
                ui.lock.using(false);
            }
        }
    },
    loading: { // 로딩중..
        show: function (opt) {
            var els = '';
            if (document.querySelectorAll("body>.ui-loading").length) { return}
            // console.log(opt);
            // var els = '<div class="ui-loading"><em></em></div>';
            if (opt == 'dot' || opt == undefined){
                els = `<div class="ui-loading ui-loading-dot">
                    <div class="bx"><em><i></i></em></div>
                </div>`;
            }
            if (opt == 'glx'){
                els = `<span class="ui-loading ui-load-glx full">
                <span class="gbx">
                    <em class="bx">
                        <i></i> <i></i><i></i><i></i>
                    </em>
                </span>
              </span>`;
            }
            document.querySelector("body").insertAdjacentHTML("afterbegin", els);
            document.querySelector("body").classList.add("is-loading");
        
        },
        hide: function () {
            document.querySelectorAll("body>.ui-loading.full").forEach(el => el.remove());
            document.querySelector("body").classList.remove("is-loading");
        }
    },
    lock: { // 스크롤 막기,풀기
        sct: 0,
        gap: ()=> window.innerWidth - document.body.clientWidth,
        stat: false,
        els: ".pop-layer  , .ui-confirm , .ui-alert",
        set: function () {
            if (document.querySelectorAll(this.els).length <= 0) {
                this.using(false);
            }
        },
        using: function (opt) {
            const body = document.querySelectorAll("body , html");
            const html = document.querySelector("html");
            if (opt === true && this.stat === false) {
                document.documentElement.style.setProperty('--scrPad', `${this.gap()}px`);
                ui.lock.stat = true;
                ui.lock.sct = window.scrollY;
                body.forEach(body => body.classList.add("is-lock", "is-lock-end"));
                html.style.top = -ui.lock.sct + "px";
                // $(this.els).bind("touchmove scroll", function(e){ e.preventDefault(); });
            }
            if (opt === false && document.querySelectorAll(this.els).length <= 0 && html.classList.contains("is-lock")) {
                ui.lock.stat = false;
                body.forEach(body => body.classList.remove("is-lock"));
                html.style.top = "";
                window.scrollTo(0, ui.lock.sct)
                // $(this.els).unbind("touchmove scroll");
                setTimeout(() => {
                    body.forEach(body => body.classList.remove("is-lock-end"));
                }, 50);
                document.documentElement.style.setProperty('--scrPad', `0px`);
            }
        }
    },
};
if (typeof window !== "undefined") { window.ui = ui; }
export default ui