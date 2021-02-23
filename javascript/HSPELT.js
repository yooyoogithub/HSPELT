'user strict'

            let total_result = [["subject","score","answers"],];
            let answers=""; //각 단계의 사용자가 응답한 정답을 보관
            let scores=0; // 각 단계의 점수를 보여줌
            let grammar_result = [["level","no","ox","classify"],]; //Grammar 문제에 대한 답변의 정오를 저장 => 나중에 취약점 분석용
            let voca_choice = "NONE";
            let pv1done = false;
            let pv2done = false;
            let pv3done = false;
            let pv4done = false;
            let pv5done = false;
            let ischanged = false;
            
            let uplist = [["initial"],];
            let downlist = [["initial"],];
            let remain;  

            let correct = 1;

            let local_correct; //부분점수 계산하기 위한 변수

            let phonics3count;

            let qnum;
            let grammar_JSON;
            let aio_num_global; 
            let aio1done = false;
            let aio2done = false;
            let aio3done = false;
            let aio4done = false;
            let aio5done = false;
            let aio6done = false;
            let aio_choice = "NONE";
            
            let sr_num_global;
            let myaudio = new Audio(); // 전역변수로 선언
            let srpart1;
            let srpart2;
            let srpart3;
            let srpart4;
            let srpart5;  
            let srpart1score;          
            let srpart2score;
            let srpart3score;
            let srpart4score;
            let srpart5score;
            let srpartscore=0;
            let phonics_choice="NONE";
            let story_choice="NONE";
            let reading_choice="NONE";
            
            let tempbody; //문단을 보여주기 전 이전 상태를 임시로 저장하는 변수

            let saveall;
            let reportform;

            function start(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');

                let thisbutton = document.getElementById('donebutton');
                                
                if(document.getElementById('phonics').checked){                    
                    title.innerText = "Phonics Test를 시작합니다.";
                    thisbutton.innerHTML = '<input type="button" value="다시선택" class="subinput" onclick="restart()"></input>';
                    phonics1_test();
                } else if(document.getElementById('grammar').checked){                    
                    title.innerText = "Grammar Test를 시작합니다.";
                    thisbutton.innerHTML = '<input type="button" value="다시선택" class="subinput" onclick="restart()"></input>';
                    grammar_test();
                } else if(document.getElementById('voca').checked){                    
                    title.innerText = "Vocabulary Test를 시작합니다.";
                    thisbutton.innerHTML = '<input type="button" value="다시선택" class="subinput" onclick="restart()"></input>';
                    voca_test();
                } else if(document.getElementById('middle').checked){                    
                    title.innerText = "중등실력 Test를 시작합니다.";
                    thisbutton.innerHTML = '<input type="button" value="다시선택" class="subinput" onclick="restart()"></input>';
                    middle_test();
                } else if(document.getElementById('rtst').checked){                    
                    title.innerText = "한솔플러스영어 교재선택을 위한 Test를 시작합니다.";
                    thisbutton.innerHTML = '<input type="button" value="다시선택" class="subinput" onclick="restart()"></input>';
                    rtst_test();
                } else{
                    alert("체크된 시험이 없습니다.");
                }   
            }

            function restart(){
                //모두 초기화
                document.getElementById('title').innerHTML = "";
                document.getElementById('head').innerHTML = "";
                document.getElementById('body').innerHTML = "";
                document.getElementById('button').innerHTML = "";

                document.getElementById('result').innerHTML = `<h1>RESULT</h1><hr>
                <span>학생이름</span><input type="text" id="studentname"><br>
                <span>학년</span><input type="text" id="studentgrade"><br>
                <span>학원명</span><input type="text" id="classname"><br>
                <span>학원전화번호</span><input type="text" id="classphone"><br>
                <span>날짜</span><input type="text" id="testdate"><br><hr>
                <input id="resultbutton" type="button" value="결과보기Print" onclick="printoutresult()"><hr>`;

                let thisbutton = document.getElementById('donebutton');
                thisbutton.innerHTML = '<input type="button" value="선택완료" class="subinput" onclick="start()"></input>';

                myaudio.pause();
                myaudio.currentTime = 0;
            }

            function phonics1_test(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');

                console.log("파닉스 Test 시작 됨.");

                scores = 0;

                head.innerText = "아래 알파벳을 순서에 맞게 배열하세요.";

                answers ="";

                let init_au = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                let al = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
                let an = ['에이','비','씨','디','이','에프','쥐','에이치','아이','제이','케이','엘','엠','엔','오','피','큐','알','에스','티','유','브이','더블유','엑스','와이','제트'];
                let as = ['애','브','크','드','에','프','그','흐','이','즈','크','르','므','느','아','프','쿼','르','스','트','어','브','워','크스','이','즈'];

                let random;

                let au = [];

                remain = 26;

                for(let i=0;i<init_au.length;){
                    random = Math.floor(Math.random()*init_au.length);
                    au.push(init_au[random]);
                    init_au.splice(random,1);
                }

                let table ="";

                body.innerHTML = '<div id="firstbody"></div><hr><div id="secondbody"></div>';

                const firstbody = document.getElementById("firstbody");

                for(let i=0;i<26;i++){
                    uplist[i] = '<input type="button" id="ab" value="'+au[i]+'" onclick="alphabetclick('+"'"+au[i]+"'"+')">';
                    table = table+uplist[i];
                }
                
                firstbody.innerHTML = table;
            }

            function alphabetclick(alphabet){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');

                let secondtable="";
                let firsttable ="";

                //아래 화면에 해당 알파벳 버튼 추가
                secondtable = secondbody.innerHTML;
                secondtable = secondtable + '<input type="button" id="cd" value="'+alphabet+'" onclick="alphabetRemoveclick('+"'"+alphabet+"'"+')">';
                downlist.push('<input type="button" id="cd" value="'+alphabet+'" onclick="alphabetRemoveclick('+"'"+alphabet+"'"+')">');

                //위 화면에 해당 알파벳 제거
                for(let i=0;i<uplist.length;i++){
                    if(uplist[i] == '<input type="button" id="ab" value="'+alphabet+'" onclick="alphabetclick('+"'"+alphabet+"'"+')">'){
                        uplist.splice(i,1);
                        i=uplist.length;
                    }
                }
                for(let i=0;i<uplist.length;i++){
                    firsttable = firsttable + uplist[i];
                }
                firstbody.innerHTML = firsttable;                
                secondbody.innerHTML = secondtable;

                remain--;

                if(remain==0){
                    button.innerHTML = '<input type="button" id="bodybutton" onclick="phonics1_done()" value="제출">';
                }
            }

            function alphabetRemoveclick(alphabet){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');

                let secondtable="";
                let firsttable ="";

                //위 화면에 해당 알파벳 버튼 추가
                firsttable = firstbody.innerHTML;
                firsttable = firsttable + '<input type="button" id="ab" value="'+alphabet+'" onclick="alphabetclick('+"'"+alphabet+"'"+')">';
                uplist.push('<input type="button" id="ab" value="'+alphabet+'" onclick="alphabetclick('+"'"+alphabet+"'"+')">');

                //아래 화면에 해당 알파벳 버튼 제거
                for(let i=1;i<downlist.length;i++){
                    if(downlist[i] == '<input type="button" id="cd" value="'+alphabet+'" onclick="alphabetRemoveclick('+"'"+alphabet+"'"+')">'){
                        downlist.splice(i,1);
                        i=downlist.length;
                    }
                }
                for(let i=1;i<downlist.length;i++){
                    secondtable = secondtable + downlist[i];
                }

                firstbody.innerHTML = firsttable;                
                secondbody.innerHTML = secondtable;

                remain++;

                if(remain != 0){
                    button.innerHTML = "";
                }
            }

            function phonics1_done(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                let au = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                let answer = [];

                let column = 0;

                //다음 알파벳의 순서가 맞는 것을 기준으로 정확도 계산... A 다음 B가 있으면 correct + 1, A로 시작하는지 Z로 끝나는지도
                if(downlist[0] === '<input type="button" id="cd" value="A" onclick="alphabetRemoveclick('+"A"+')">'){
                    correct++;
                }

                for(let i=1;i<27;i++){
                    for(let j=0;j<26;j++){
                        if(downlist[i] === '<input type="button" id="cd" value="'+au[j]+'" onclick="alphabetRemoveclick('+"'"+au[j]+"'"+')">'){
                            //table = table + au[j];
                            answers = answers + au[j];
                            column ++;
                            if(column == 10){
                                //table = table + "<br>";
                                column = 0;
                            }
                            if(downlist[i+1] === '<input type="button" id="cd" value="'+au[j+1]+'" onclick="alphabetRemoveclick('+"'"+au[j+1]+"'"+')">'){
                                correct++;
                            }
                        }
                    }
                }

                if(downlist[25] === '<input type="button" id="cd" value="Z" onclick="alphabetRemoveclick('+"Z"+')">'){
                    correct++;
                }

                scores = Math.floor((correct / 26)*100); 
                table = table + '대문자 정답률 : ' + scores + "% <hr>";

                result.innerHTML = table;
                button.innerHTML = "";

                total_result.push(["대문자순서",scores,answers]);

                phonics2_test();
            }

            function phonics2_test(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');

                answers ="";
                scores = 0;

                downlist.splice(1,26);

                console.log("파닉스 Test 2 시작 됨.");
                head.innerText = "아래 알파벳을 순서에 맞게 배열하세요.";

                let al = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                let init_au = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
                let an = ['에이','비','씨','디','이','에프','쥐','에이치','아이','제이','케이','엘','엠','엔','오','피','큐','알','에스','티','유','브이','더블유','엑스','와이','제트'];
                let as = ['애','브','크','드','에','프','그','흐','이','즈','크','르','므','느','아','프','쿼','르','스','트','어','브','워','크스','이','즈'];

                let random;

                let au = [];

                remain = 26;

                for(let i=0;i<init_au.length;){
                    random = Math.floor(Math.random()*init_au.length);
                    au.push(init_au[random]);
                    init_au.splice(random,1);
                }

                let table ="";

                body.innerHTML = '<div id="firstbody"></div><hr><div id="secondbody"></div>';

                const firstbody = document.getElementById("firstbody");

                for(let i=0;i<26;i++){
                    uplist[i] = '<input type="button" id="ab" value="'+au[i]+'" onclick="alphabetclick2('+"'"+au[i]+"'"+')">';
                    table = table+uplist[i];
                }
                
                firstbody.innerHTML = table;
            }

            function alphabetclick2(alphabet){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');

                let secondtable="";
                let firsttable ="";

                //아래 화면에 해당 알파벳 버튼 추가
                secondtable = secondbody.innerHTML;
                secondtable = secondtable + '<input type="button" id="cd" value="'+alphabet+'" onclick="alphabetRemoveclick2('+"'"+alphabet+"'"+')">';
                downlist.push('<input type="button" id="cd" value="'+alphabet+'" onclick="alphabetRemoveclick2('+"'"+alphabet+"'"+')">');

                //위 화면에 해당 알파벳 제거
                for(let i=0;i<uplist.length;i++){
                    if(uplist[i] == '<input type="button" id="ab" value="'+alphabet+'" onclick="alphabetclick2('+"'"+alphabet+"'"+')">'){
                        uplist.splice(i,1);
                        i=uplist.length;
                    }
                }
                for(let i=0;i<uplist.length;i++){
                    firsttable = firsttable + uplist[i];
                }
                firstbody.innerHTML = firsttable;                
                secondbody.innerHTML = secondtable;

                remain--;

                if(remain==0){
                    button.innerHTML = '<input type="button" id="bodybutton" onclick="phonics2_done()" value="제출">';
                }
            }

            function alphabetRemoveclick2(alphabet){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');

                let secondtable="";
                let firsttable ="";

                //위 화면에 해당 알파벳 버튼 추가
                firsttable = firstbody.innerHTML;
                firsttable = firsttable + '<input type="button" id="ab" value="'+alphabet+'" onclick="alphabetclick2('+"'"+alphabet+"'"+')">';
                uplist.push('<input type="button" id="ab" value="'+alphabet+'" onclick="alphabetclick2('+"'"+alphabet+"'"+')">');

                //아래 화면에 해당 알파벳 버튼 제거
                for(let i=1;i<downlist.length;i++){
                    if(downlist[i] == '<input type="button" id="cd" value="'+alphabet+'" onclick="alphabetRemoveclick2('+"'"+alphabet+"'"+')">'){
                        downlist.splice(i,1);
                        i=downlist.length;
                    }
                }
                for(let i=1;i<downlist.length;i++){
                    secondtable = secondtable + downlist[i];
                }

                firstbody.innerHTML = firsttable;                
                secondbody.innerHTML = secondtable;

                remain++;

                if(remain != 0){
                    button.innerHTML = "";
                }
            }

            function phonics2_done(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                let au = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
                let answer = [];

                correct = 1;
                let column = 0;

                //다음 알파벳의 순서가 맞는 것을 기준으로 정확도 계산... a 다음 b가 있으면 correct + 1, a로 시작하는지 z로 끝나는지도
                if(downlist[0] === '<input type="button" id="cd" value="A" onclick="alphabetRemoveclick2('+"A"+')">'){
                    correct++;
                }

                for(let i=1;i<27;i++){
                    for(let j=0;j<26;j++){
                        if(downlist[i] === '<input type="button" id="cd" value="'+au[j]+'" onclick="alphabetRemoveclick2('+"'"+au[j]+"'"+')">'){
                            //table = table + au[j];
                            answers = answers + au[j];
                            column ++;
                            if(column == 10){
                                //table = table + "<br>";
                                column = 0;
                            }
                            if(downlist[i+1] === '<input type="button" id="cd" value="'+au[j+1]+'" onclick="alphabetRemoveclick2('+"'"+au[j+1]+"'"+')">'){
                                correct++;
                            }
                        }
                    }
                }

                if(downlist[25] === '<input type="button" id="cd" value="z" onclick="alphabetRemoveclick2('+"z"+')">'){
                    correct++;
                }

                scores = Math.floor((correct / 26)*100);
                table = table + '소문자 정답률 : ' + scores + "% <hr>";

                result.innerHTML = table;
                button.innerHTML = "";

                total_result.push(["소문자순서",scores,answers]);

                phonics3_test();
            }
            
            function phonics3_test(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const result = document.getElementById('result');

                console.log("파닉스 Test 3 시작 됨.");
                head.innerText = "아래 알파벳에 일치하는 소문자를 클릭하세요.";

                let table = "";
                correct = 0;
                scores = 0;

                let au = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                let al = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
                let an = ['에이','비','씨','디','이','에프','쥐','에이치','아이','제이','케이','엘','엠','엔','오','피','큐','알','에스','티','유','브이','더블유','엑스','와이','제트'];
                let as = ['애','브','크','드','에','프','그','흐','이','즈','크','르','므','느','아','프','쿼','르','스','트','어','브','워','크스','이','즈'];

                body.innerHTML = '<div id="firstbody"></div><div id="secondbody"></div>';
                button.innerHTML = "";

                for(let i=0;i<al.length;){
                    random = Math.floor(Math.random()*al.length);
                    table = table + '<input type="button" id="cd" value="'+al[random]+'" onclick="alphabetclick3('+"'"+al[random]+"'"+')">';
                    al.splice(random,1);
                }

                uplist = au;
                document.getElementById('firstbody').innerHTML = '<span id="capital">'+au[0]+'</span>';
                phonics3count = 0;
                document.getElementById('secondbody').innerHTML = table;
            }

            function alphabetclick3(alphabet){

                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let answers = "";
                let table = result.innerHTML;

                //정답확인
                if(phonics3count<26){
                    //table = table + uplist[phonics3count] + "=>" + alphabet + "/ ";
                    answers = answers + uplist[phonics3count] + "=>" + alphabet + "/ ";
                    if(alphabet === uplist[phonics3count].toLowerCase()){                        
                        correct++;
                    }
                }

                //다음 문제출제
                phonics3count++;
                if(phonics3count<26){
                    firstbody.innerHTML = '<span id="capital">'+uplist[phonics3count]+'</span>';
                }

                result.innerHTML = table;

                if(phonics3count == 26){
                    button.innerHTML = '<input type="button" id="bodybutton" onclick="phonics3_done()" value="제출">';
                    body.innerHTML = '<div id="pushbutton">아래 제출 버튼을 누르세요.</div>';
                }
            }

            function phonics3_done(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                //대문자와 소문자가 같으면 정답
                scores = Math.floor((correct / 26)*100);
                table = table + '대소문자매칭 정답률 : ' + scores + "% <hr>";

                result.innerHTML = table;
                button.innerHTML = "";

                total_result.push(["대소문자매칭",scores,answers]);
                phonics4_test();                
            }

            function phonics4_test(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');

                let table = "";
                let table2 = "";
                answers ="";
                scores = 0;

                console.log("파닉스 Test 4 시작 됨.");
                head.innerText = "아래 큐빜은 알파벳의 대문자,소문자,이름,소리를 표시한 것입니다. 노란색칸에 맞는 것을 찾아보세요.";

                let au = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                let an = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
                let al = ['에이','비','씨','디','이','에프','쥐','에이치','아이','제이','케이','엘','엠','엔','오','피','큐','알','에스','티','유','브이','더블유','엑스','와이','제트'];
                let as = ['애','브','크','드','에','프','그','흐','이','즈','크','르','므','느','아','프','쿼','르','스','트','어','브','워','크스','이','즈'];

                body.innerHTML = '<div id="firstbody"></div><div id="secondbody"></div>';
                button.innerHTML = "";
                correct = 0;

                for(let i=0;i<al.length;){
                    random = Math.floor(Math.random()*al.length);
                    table = table + '<input type="button" id="ef" value="'+al[random]+'" onclick="alphabetclick4('+"'"+al[random]+"'"+')">';
                    al.splice(random,1);
                }

                phonics3count = 0;
                table2 = table2 + '<input type="button" id="gh" value="'+au[phonics3count]+'">';
                table2 = table2 + '<input type="button" id="gh" value="'+an[phonics3count]+'"><br>';
                table2 = table2 + '<input type="button" id="hg" value="이름">';
                table2 = table2 + '<input type="button" id="gh" value="'+as[phonics3count]+'">';
                
                document.getElementById('firstbody').innerHTML = table2;

                document.getElementById('secondbody').innerHTML = table;
            }

            function alphabetclick4(alphabetname){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let au = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                let an = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
                let al = ['에이','비','씨','디','이','에프','쥐','에이치','아이','제이','케이','엘','엠','엔','오','피','큐','알','에스','티','유','브이','더블유','엑스','와이','제트'];
                let as = ['애','브','크','드','에','프','그','흐','이','즈','크','르','므','느','아','프','쿼','르','스','트','어','브','워','크스','이','즈'];

                let table2 = "";
                let table = result.innerHTML;

                //정답확인
                if(phonics3count<26){
                    //table = table + au[phonics3count] + "=>" + alphabetname + "/ ";
                    answers = answers + au[phonics3count] + "=>" + alphabetname + "/ ";
                    if(alphabetname === al[phonics3count]){                        
                        correct++;
                    }
                }

                //다음 문제출제
                phonics3count++;

                if(phonics3count<26){
                    table2 = table2 + '<input type="button" id="gh" value="'+au[phonics3count]+'">';
                    table2 = table2 + '<input type="button" id="gh" value="'+an[phonics3count]+'"><br>';
                    table2 = table2 + '<input type="button" id="hg" value="이름">';
                    table2 = table2 + '<input type="button" id="gh" value="'+as[phonics3count]+'">';
                    firstbody.innerHTML = table2;
                }

                result.innerHTML = table;

                if(phonics3count == 26){
                    button.innerHTML = '<input type="button" id="bodybutton" onclick="phonics4_done()" value="제출">';
                    body.innerHTML = '<div id="pushbutton">아래 제출 버튼을 누르세요.</div>';
                }
            }

            function phonics4_done(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                //대문자와 소문자가 같으면 정답
                scores = Math.floor((correct / 26)*100);
                table = table + '알파벳이름 정답률 : ' + scores + "% <hr>";

                result.innerHTML = table;
                button.innerHTML = "";

                total_result.push(["알파벳이름",scores,answers]);
                phonics5_test();
            }

            function phonics5_test(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');

                let table = "";
                let table2 = "";

                answers ="";
                scores = 0;

                console.log("파닉스 Test 5 시작 됨.");
                head.innerText = "아래 큐빜은 알파벳의 대문자,소문자,이름,소리를 표시한 것입니다. 노란색칸에 맞는 것을 찾아보세요.";

                let au = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                let an = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
                let al = ['에이','비','씨','디','이','에프','쥐','에이치','아이','제이','케이','엘','엠','엔','오','피','큐','알','에스','티','유','브이','더블유','엑스','와이','제트'];
                let as = ['애','브','크','드','에','프','그','흐','이','즈','크','르','므','느','아','프','쿼','르','스','트','어','브','워','크스','이','즈'];

                body.innerHTML = '<div id="firstbody"></div><div id="secondbody"></div>';
                button.innerHTML = "";
                correct = 0;

                for(let i=0;i<as.length;){
                    random = Math.floor(Math.random()*as.length);
                    table = table + '<input type="button" id="ef" value="'+as[random]+'" onclick="alphabetclick5('+"'"+as[random]+"'"+')">';
                    as.splice(random,1);
                }

                phonics3count = 0;
                table2 = table2 + '<input type="button" id="gh" value="'+au[phonics3count]+'">';
                table2 = table2 + '<input type="button" id="gh" value="'+an[phonics3count]+'"><br>';
                table2 = table2 + '<input type="button" id="gh" value="'+al[phonics3count]+'">';
                table2 = table2 + '<input type="button" id="hg" value="소리">';
                
                document.getElementById('firstbody').innerHTML = table2;

                document.getElementById('secondbody').innerHTML = table;
            }

            function alphabetclick5(alphabetsound){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let au = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                let an = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
                let al = ['에이','비','씨','디','이','에프','쥐','에이치','아이','제이','케이','엘','엠','엔','오','피','큐','알','에스','티','유','브이','더블유','엑스','와이','제트'];
                let as = ['애','브','크','드','에','프','그','흐','이','즈','크','르','므','느','아','프','쿼','르','스','트','어','브','워','크스','이','즈'];

                let table2 = "";
                let table = result.innerHTML;

                //정답확인
                if(phonics3count<26){
                    //table = table + au[phonics3count] + "=>" + alphabetsound + "/ ";
                    answers = answers + au[phonics3count] + "=>" + alphabetsound + "/ ";
                    if(alphabetsound === as[phonics3count]){                        
                        correct++;
                    }
                }

                //다음 문제출제
                phonics3count++;

                if(phonics3count<26){
                    table2 = table2 + '<input type="button" id="gh" value="'+au[phonics3count]+'">';
                    table2 = table2 + '<input type="button" id="gh" value="'+an[phonics3count]+'"><br>';
                    table2 = table2 + '<input type="button" id="gh" value="'+al[phonics3count]+'">';
                    table2 = table2 + '<input type="button" id="hg" value="소리">';
                    firstbody.innerHTML = table2;
                }

                result.innerHTML = table;

                if(phonics3count == 26){
                    button.innerHTML = '<input type="button" id="bodybutton" onclick="phonics5_done()" value="제출">';
                    body.innerHTML = '<div id="pushbutton">아래 제출 버튼을 누르세요.</div>';
                }
            }

            function phonics5_done(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                //대문자와 소문자가 같으면 정답
                scores = Math.floor((correct / 26)*100);
                table = table + '알파벳소리 정답률 : ' + scores + "% <hr>";

                result.innerHTML = table;
                button.innerHTML = "";

                total_result.push(["알파벳소리",scores,answers]);

                if(document.getElementById('grammar').checked){                    
                    title.innerText = "Grammar Test를 시작합니다.";
                    grammar_test();
                } else if(document.getElementById('voca').checked){                    
                    title.innerText = "Vocabulary Test를 시작합니다.";
                    voca_test();
                } else if(document.getElementById('middle').checked){                    
                    title.innerText = "중등실력 Test를 시작합니다.";
                    middle_test();
                } else if(document.getElementById('rtst').checked){                    
                    title.innerText = "한솔플러스영어 교재선택을 위한 Test를 시작합니다.";
                    rtst_test();
                } else{
                    alert("더 이상 출제된 시험이 없습니다.");
                    button.innerHTML = '<input type="button" id="bodybutton" onclick="printresult()" value="결과보기">';
                    body.innerHTML = '<div id="pushbutton">아래 결과보기 버튼을 누르세요.</div>';
                }               

            }

            function grammar_test(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const result = document.getElementById('result');

                let grammar_num = document.getElementById('grammarnum').value;
                
                console.log("문법 Test 시작 됨.");

                body.innerHTML = '<div id="firstbody"></div><div id="secondbody"></div>';
                button.innerHTML = "";
                correct = 0;
                scores = 0;

                if(grammar_num === "0"){   
                    qnum = 0;                 
                    grammar1_start();
                }else if (grammar_num === "1"){
                    qnum = 0;                 
                    grammar2_start();
                }else if (grammar_num === "2"){
                    qnum = 0;                 
                    grammar3_start();
                }else{
                    alert("Grammar 시작 단계가 설정되지 않았습니다.");
                    body.innerHTML =  "";
                }
            }

            function grammar1_start(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                phonics3count = 0;
                answers = "";

                title.innerText = "Grammar 1 Test를 시작합니다.";

                // test 파일 불러와서 json 파일로 만들기
                let selectedFile = new XMLHttpRequest();
                //selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/data/level_test_grammar_1.xlsx");
                selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/data/grammar_1.xlsx"); //파일명의 길이도 문제가 되는 것 같음. 짧게 유지
                //selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/test.xlsx");
                selectedFile.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
                selectedFile.responseType = "blob"; //Blob형식으로 부탁합니다!
                selectedFile.send();  //위 요청을 보낸다.

                selectedFile.onload = function(){ 

                    if(selectedFile.status === 200){

                        let blob = new Blob([selectedFile.response], {type:'application/xlsx'}); //받은 파일의 내용을 blob 형태로 변환

                        if(blob.size>0){
                            let fileReader = new FileReader();
                            fileReader.readAsBinaryString(blob);                    
                            fileReader.onload = (event)=>{
                                let data = event.target.result;
                                let workbook = XLSX.read(data,{type:"binary"});
                                workbook.SheetNames.forEach(sheet => {
                                    //console.log("sheet=>"+sheet);
                                    sheet = 'grammar_1';
                                    let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                                    let jsonexcelfile = JSON.stringify(rowObject, undefined, 4);
                                    let jsonexcelfileparse = JSON.parse(jsonexcelfile);
                                    grammar_JSON = JSON.parse(jsonexcelfile);
                                    //console.log(jsonexcelfileparse);
                                    //document.getElementById("jsondata").innerHTML = jsonexcelfile;
                                    //console.log(jsonexcelfileparse[0].no);
                                    head.innerHTML = qnum+1+"번."+jsonexcelfileparse[qnum].head;
                                    firstbody.innerHTML = jsonexcelfileparse[qnum].q;
                                    //secondbody.innerHTML = jsonexcelfileparse[qnum].w;
                                    secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a1}" onclick="grammar1_click(1)"><br>`+
                                    `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a2}" onclick="grammar1_click(2)"><br>`+
                                    `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a3}" onclick="grammar1_click(3)"><br>`+
                                    `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a4}" onclick="grammar1_click(4)">`;

                                    //button.innerHTML = '<input type="button" id="bodybutton" onclick="grammar1_start()" value="제출">'
                                });
                                qnum++;
                            }
                        }
                    }
                }
                //여기까지 파일 불러와서 jsonexcelfileparse에 저장 하기
            }

            function grammar1_click(useranswer){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                let tqnum = grammar_JSON.length;

                //정답체크
                if(phonics3count < tqnum){
                    answers = answers + (phonics3count+1) + "번." + useranswer + "/";
                    //console.log((phonics3count+1) + "번." + useranswer + "/" + "정답"+grammar_JSON[phonics3count].a_answer);
                    if(useranswer === grammar_JSON[phonics3count].a_answer){
                        correct ++;
                        //grammar_result = [["level 1,2,3","no","ox : 오답=0, 정답=1","classify"],];
                        grammar_result.push([1,phonics3count+1,1,grammar_JSON[phonics3count].type]);
                    }else{
                        grammar_result.push([1,phonics3count+1,0,grammar_JSON[phonics3count].type]);
                    }
                }

                //다음 문제출제
                phonics3count++;

                if(phonics3count<tqnum){
                    head.innerHTML = phonics3count+1+"번."+grammar_JSON[phonics3count].head;
                    firstbody.innerHTML = grammar_JSON[phonics3count].q;
                    secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${grammar_JSON[phonics3count].a1}" onclick="grammar1_click(1)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[phonics3count].a2}" onclick="grammar1_click(2)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[phonics3count].a3}" onclick="grammar1_click(3)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[phonics3count].a4}" onclick="grammar1_click(4)">`;
                }

                if(phonics3count === tqnum){
                    button.innerHTML = `<input type="button" id="bodybutton" onclick="grammar1_done(${tqnum})" value="제출">`;
                    firstbody.innerHTML = '<div id="pushbutton">아래 제출 버튼을 누르세요.</div>';
                    secondbody.innerHTML = '';
                }

            }

            function grammar1_done(tqnum){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                //대문자와 소문자가 같으면 정답
                scores = Math.floor((correct / tqnum)*100);
                table = table + 'Grammar 1 정답률 : ' + scores + "% <hr>";

                result.innerHTML = table;
                button.innerHTML = "";

                total_result.push(["Grammar 1",scores,answers]);

                grammar2_start();

            }

            function grammar2_start(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                phonics3count = 0;
                answers = "";
                correct = 0;

                qnum = 0;

                title.innerText = "Grammar 2 Test를 시작합니다.";

                // test 파일 불러와서 json 파일로 만들기
                let selectedFile = new XMLHttpRequest();
                //selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/level_test_grammar_1.xlsx");
                selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/data/grammar_2.xlsx"); //파일명의 길이도 문제가 되는 것 같음. 짧게 유지
                //selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/test.xlsx");
                selectedFile.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
                selectedFile.responseType = "blob"; //Blob형식으로 부탁합니다!
                selectedFile.send();  //위 요청을 보낸다.

                selectedFile.onload = function(){ 

                    if(selectedFile.status === 200){

                        let blob = new Blob([selectedFile.response], {type:'application/xlsx'}); //받은 파일의 내용을 blob 형태로 변환

                        if(blob.size>0){
                            let fileReader = new FileReader();
                            fileReader.readAsBinaryString(blob);                    
                            fileReader.onload = (event)=>{
                                let data = event.target.result;
                                let workbook = XLSX.read(data,{type:"binary"});
                                workbook.SheetNames.forEach(sheet => {
                                    //console.log("sheet=>"+sheet);
                                    sheet = 'grammar_2';
                                    let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                                    let jsonexcelfile = JSON.stringify(rowObject, undefined, 4);
                                    let jsonexcelfileparse = JSON.parse(jsonexcelfile);
                                    grammar_JSON = JSON.parse(jsonexcelfile);
                                    //console.log(jsonexcelfileparse);
                                    //document.getElementById("jsondata").innerHTML = jsonexcelfile;
                                    //console.log(jsonexcelfileparse[0].no);
                                    head.innerHTML = qnum+1+"번."+jsonexcelfileparse[qnum].head;
                                    firstbody.innerHTML = jsonexcelfileparse[qnum].q;
                                    //secondbody.innerHTML = jsonexcelfileparse[qnum].w;
                                    secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a1}" onclick="grammar2_click(1)"><br>`+
                                    `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a2}" onclick="grammar2_click(2)"><br>`+
                                    `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a3}" onclick="grammar2_click(3)"><br>`+
                                    `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a4}" onclick="grammar2_click(4)">`;

                                    //button.innerHTML = '<input type="button" id="bodybutton" onclick="grammar2_start()" value="제출">'
                                });
                                qnum++;
                            }
                        }
                    }
                }
                //여기까지 파일 불러와서 jsonexcelfileparse에 저장 하기
            }

            function grammar2_click(useranswer){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                let tqnum = grammar_JSON.length;

                //정답체크

                if(phonics3count < tqnum){
                    answers = answers + (phonics3count+1) + "번." + useranswer + "/";
                    //console.log((phonics3count+1) + "번." + useranswer + "/" + "정답"+grammar_JSON[phonics3count].a_answer);
                    if(useranswer === grammar_JSON[phonics3count].a_answer){
                        correct ++;
                        //grammar_result = [["level 1,2,3","no","ox : 오답=0, 정답=1","classify"],];
                        grammar_result.push([2,phonics3count+1,1,grammar_JSON[phonics3count].type]);
                    }else{
                        grammar_result.push([2,phonics3count+1,0,grammar_JSON[phonics3count].type]);
                    }
                }

                //다음 문제출제
                phonics3count++;

                if(phonics3count<tqnum){
                    head.innerHTML = phonics3count+1+"번."+grammar_JSON[phonics3count].head;
                    firstbody.innerHTML = grammar_JSON[phonics3count].q;
                    secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${grammar_JSON[phonics3count].a1}" onclick="grammar2_click(1)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[phonics3count].a2}" onclick="grammar2_click(2)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[phonics3count].a3}" onclick="grammar2_click(3)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[phonics3count].a4}" onclick="grammar2_click(4)">`;
                }

                if(phonics3count === tqnum){
                    button.innerHTML = `<input type="button" id="bodybutton" onclick="grammar2_done(${tqnum})" value="제출">`;
                    firstbody.innerHTML = '<div id="pushbutton">아래 제출 버튼을 누르세요.</div>';
                    secondbody.innerHTML = '';
                }

            }

            function grammar2_done(tqnum){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                //대문자와 소문자가 같으면 정답
                scores = Math.floor((correct / tqnum)*100);
                table = table + 'Grammar 2 정답률 : ' + scores + "% <hr>";

                result.innerHTML = table;
                button.innerHTML = "";

                total_result.push(["Grammar 2",scores,answers]);

                grammar3_start();
            }
            
            function grammar3_start(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                phonics3count = 0;
                answers = "";

                qnum = 0;

                correct = 0;

                title.innerText = "Grammar 3 Test를 시작합니다.";

                // test 파일 불러와서 json 파일로 만들기
                let selectedFile = new XMLHttpRequest();
                //selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/level_test_grammar_1.xlsx");
                selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/data/grammar_3.xlsx"); //파일명의 길이도 문제가 되는 것 같음. 짧게 유지
                //selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/test.xlsx");
                selectedFile.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
                selectedFile.responseType = "blob"; //Blob형식으로 부탁합니다!
                selectedFile.send();  //위 요청을 보낸다.

                selectedFile.onload = function(){ 

                    if(selectedFile.status === 200){

                        let blob = new Blob([selectedFile.response], {type:'application/xlsx'}); //받은 파일의 내용을 blob 형태로 변환

                        if(blob.size>0){
                            let fileReader = new FileReader();
                            fileReader.readAsBinaryString(blob);                    
                            fileReader.onload = (event)=>{
                                let data = event.target.result;
                                let workbook = XLSX.read(data,{type:"binary"});
                                workbook.SheetNames.forEach(sheet => {
                                    //console.log("sheet=>"+sheet);
                                    sheet = 'grammar_3';
                                    let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                                    let jsonexcelfile = JSON.stringify(rowObject, undefined, 4);
                                    let jsonexcelfileparse = JSON.parse(jsonexcelfile);
                                    grammar_JSON = JSON.parse(jsonexcelfile);
                                    //console.log(jsonexcelfileparse);
                                    //document.getElementById("jsondata").innerHTML = jsonexcelfile;
                                    //console.log(jsonexcelfileparse[0].no);
                                    head.innerHTML = qnum+1+"번."+jsonexcelfileparse[qnum].head;
                                    firstbody.innerHTML = jsonexcelfileparse[qnum].q;
                                    //secondbody.innerHTML = jsonexcelfileparse[qnum].w;
                                    secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a1}" onclick="grammar3_click(1)"><br>`+
                                    `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a2}" onclick="grammar3_click(2)"><br>`+
                                    `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a3}" onclick="grammar3_click(3)"><br>`+
                                    `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a4}" onclick="grammar3_click(4)">`;

                                    //button.innerHTML = '<input type="button" id="bodybutton" onclick="grammar3_start()" value="제출">'
                                });
                                qnum++;
                            }
                        }
                    }
                }
                //여기까지 파일 불러와서 jsonexcelfileparse에 저장 하기
            }

            function grammar3_click(useranswer){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                let tqnum = grammar_JSON.length;

                //정답체크
                if(phonics3count < tqnum){
                    answers = answers + (phonics3count+1) + "번." + useranswer + "/";
                    //console.log((phonics3count+1) + "번." + useranswer + "/" + "정답"+grammar_JSON[phonics3count].a_answer);
                    if(useranswer === grammar_JSON[phonics3count].a_answer){
                        correct ++;
                        //grammar_result = [["level 1,2,3","no","ox : 오답=0, 정답=1","classify"],];
                        grammar_result.push([3,phonics3count+1,1,grammar_JSON[phonics3count].type]);
                    }else{
                        grammar_result.push([3,phonics3count+1,0,grammar_JSON[phonics3count].type]);
                    }
                }

                //다음 문제출제
                phonics3count++;

                if(phonics3count<tqnum){
                    head.innerHTML = phonics3count+1+"번."+grammar_JSON[phonics3count].head;
                    firstbody.innerHTML = grammar_JSON[phonics3count].q;
                    secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${grammar_JSON[phonics3count].a1}" onclick="grammar3_click(1)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[phonics3count].a2}" onclick="grammar3_click(2)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[phonics3count].a3}" onclick="grammar3_click(3)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[phonics3count].a4}" onclick="grammar3_click(4)">`;
                }

                if(phonics3count === tqnum){
                    button.innerHTML = `<input type="button" id="bodybutton" onclick="grammar3_done(${tqnum})" value="제출">`;
                    firstbody.innerHTML = '<div id="pushbutton">아래 제출 버튼을 누르세요.</div>';
                    secondbody.innerHTML = '';
                }

            }

            function grammar3_done(tqnum){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                //대문자와 소문자가 같으면 정답
                scores = Math.floor((correct / tqnum)*100);
                table = table + 'Grammar 3 정답률 : ' + scores + "% <hr>";

                result.innerHTML = table;
                button.innerHTML = "";

                total_result.push(["Grammar 3",scores,answers]);

                if(document.getElementById('voca').checked){                    
                    title.innerText = "Vocabulary Test를 시작합니다.";
                    voca_test();
                } else if(document.getElementById('middle').checked){                    
                    title.innerText = "중등실력 Test를 시작합니다.";
                    middle_test();
                } else if(document.getElementById('rtst').checked){                    
                    title.innerText = "한솔플러스영어 교재선택을 위한 Test를 시작합니다.";
                    rtst_test();
                } else{
                    alert("더 이상 출제된 시험이 없습니다.");
                    button.innerHTML = '<input type="button" id="bodybutton" onclick="printresult()" value="결과보기">';
                    body.innerHTML = '<div id="pushbutton">아래 결과보기 버튼을 누르세요.</div>';
                }   
            }

            function voca_test(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const result = document.getElementById('result');

                let voca_num = document.getElementById('pv').value;
                
                console.log("어휘 Test 시작 됨.");

                body.innerHTML = '<div id="firstbody"></div><div id="secondbody"></div>';
                button.innerHTML = "";

                if(voca_num === "0"){           
                    pv0_start();
                }else if (voca_num === "1"){        
                    pv1_start();
                }else if (voca_num === "2"){       
                    pv2_start();
                }else if (voca_num === "3"){            
                    pv3_start();
                }else if (voca_num === "4"){              
                    pv4_start();
                }else if (voca_num === "5"){             
                    pv5_start();
                }else{
                    alert("Grammar 시작 단계가 설정되지 않았습니다.");
                    body.innerHTML =  "";
                }
            }

            let pvanswer; //정답의 번호를 담는 변수

            function pv0_start(){
                console.log("기본 어휘 Test 시작 됨.");

                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;
                let answerrandom = Math.floor(Math.random()*4)+1; //1~4 중 정답이 들어갈 번호
            
                let answertext; //정답문자
                let p1text;     //보기1문자
                let p2text;     //보기2문자
                let p3text;     //보기3문자
                let prob; //문제

                phonics3count = 0;

                answers = "";
                qnum = 0;
                correct = 0;

                title.innerText = "Voca Basic Level Test를 시작합니다.";

                // test 파일 불러와서 json 파일로 만들기
                let selectedFile = new XMLHttpRequest();
                //selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/level_test_grammar_1.xlsx");
                selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/data/pv0.xlsx"); //파일명의 길이도 문제가 되는 것 같음. 짧게 유지
                //selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/test.xlsx");
                selectedFile.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
                selectedFile.responseType = "blob"; //Blob형식으로 부탁합니다!
                selectedFile.send();  //위 요청을 보낸다.

                selectedFile.onload = function(){ 

                    if(selectedFile.status === 200){

                        let blob = new Blob([selectedFile.response], {type:'application/xlsx'}); //받은 파일의 내용을 blob 형태로 변환

                        if(blob.size>0){
                            let fileReader = new FileReader();
                            fileReader.readAsBinaryString(blob);                    
                            fileReader.onload = (event)=>{
                                let data = event.target.result;
                                let workbook = XLSX.read(data,{type:"binary"});
                                let nottwice = true;
                                workbook.SheetNames.forEach(sheet => {
                                    //console.log("sheet=>"+sheet);
                                    let Temp_JSON;
                                    if(nottwice){
                                        sheet = 'pv_0';
                                        let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                                        let jsonexcelfile = JSON.stringify(rowObject, undefined, 4);
                                        let jsonexcelfileparse = JSON.parse(jsonexcelfile);

                                        grammar_JSON = JSON.parse(jsonexcelfile);
                                        //console.log(jsonexcelfileparse);
                                        //document.getElementById("jsondata").innerHTML = jsonexcelfile;
                                        //console.log(jsonexcelfileparse[0].no);
                                        let real_num;
                                        if(document.getElementsByClassName('wordnum')[0].value === "" ){
                                            real_num = 50;
                                        }else if( Number(document.getElementsByClassName('wordnum')[0].value) > 50){
                                            real_num = 50;
                                        }else if(Number(document.getElementsByClassName('wordnum')[0].value) <= 0){
                                            real_num = 50;
                                        }
                                        else{
                                            real_num = Number(document.getElementsByClassName('wordnum')[0].value);
                                        }

                                        if(qnum < real_num){ //주어진 단어갯수보다 작아야 됨
                                            let total_pv_num = grammar_JSON.length;
                                            let random = Math.floor(Math.random()*(total_pv_num))+1;
                                            if(document.getElementById('pv_korean').checked){
                                                head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                                                prob = grammar_JSON[random].eng;
                                                firstbody.innerHTML = '<span id="capital">'+grammar_JSON[random].eng+'</span>';
                                                answertext = grammar_JSON[random].kor;
                                                grammar_JSON.splice(random,1);
                                                //나머지 3가지 보기를 만듬
                                                Temp_JSON = grammar_JSON;
                                                let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p1text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p2text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p3text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                            }else if(document.getElementById('pv_english').checked){
                                                head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                                                prob = grammar_JSON[random].kor
                                                firstbody.innerHTML = '<span id="capital">'+prob+'</span>';
                                                answertext = grammar_JSON[random].eng;
                                                grammar_JSON.splice(random,1);
                                                //나머지 3가지 보기를 만듬
                                                Temp_JSON = grammar_JSON;
                                                let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p1text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p2text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p3text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                            }else{
                                                let ke_random = Math.floor(Math.random()*2);
                                                if(ke_random === 0){ //0이면 뜻 맞추기
                                                    head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                                                    prob = grammar_JSON[random].eng;
                                                    firstbody.innerHTML = '<span id="capital">'+grammar_JSON[random].eng+'</span>';
                                                    answertext = grammar_JSON[random].kor;
                                                    grammar_JSON.splice(random,1);
                                                    //나머지 3가지 보기를 만듬
                                                    Temp_JSON = grammar_JSON;
                                                    let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p1text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p2text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p3text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                }else{ // 1이면 영어 맞추기
                                                    head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                                                    prob = grammar_JSON[random].kor;
                                                    firstbody.innerHTML = '<span id="capital">'+grammar_JSON[random].kor+'</span>';
                                                    answertext = grammar_JSON[random].eng;
                                                    grammar_JSON.splice(random,1);                                            
                                                    //나머지 3가지 보기를 만듬
                                                    Temp_JSON = grammar_JSON;
                                                    let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p1text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p2text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p3text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                }
                                            }
                                        }

                                        pvanswer = answerrandom;

                                        if(answerrandom === 1){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv0_click(1,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv0_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv0_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv0_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else if(answerrandom === 2){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv0_click(1,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv0_click(2,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv0_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv0_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else if(answerrandom === 3){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv0_click(1,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv0_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv0_click(3,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv0_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else{
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv0_click(1,'${prob}','${answertext}','${p3text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv0_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv0_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv0_click(4,'${prob}','${answertext}','${answertext}')">`;
                                        }

                                        //secondbody.innerHTML = jsonexcelfileparse[qnum].w;
                                        /*let total_pv_num = grammar_JSON.length-1;
                                        let random = Math.floor(Math.random()*(total_pv_num))+1;

                                        secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a1}" onclick="pv0_click(1)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a2}" onclick="pv0_click(2)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a3}" onclick="pv0_click(3)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a4}" onclick="pv0_click(4)">`;
                                        
                                        //button.innerHTML = '<input type="button" id="bodybutton" onclick="grammar3_start()" value="제출">'*/
                                        nottwice = false;
                                    }
                                });
                            }
                        }
                    }
                }
                //여기까지 파일 불러와서 jsonexcelfileparse에 저장 하기
            }

            function pv0_click(useranswer,proba,correctanswera,useranswera){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;
                let answerrandom = Math.floor(Math.random()*4)+1; //1~4 중 정답이 들어갈 번호
            
                let answertext; //정답문자
                let p1text;     //보기1문자
                let p2text;     //보기2문자
                let p3text;     //보기3문자

                let prob;

                //정답체크
                if(pvanswer === useranswer){
                    correct ++;
                }

                answers = answers + (qnum+1) + `번.문제(${proba})-대답(${useranswer}:${useranswera})-정답(${pvanswer}:${correctanswera})/`;

                qnum++;

                //다음문제작성

                let real_num;
                if(document.getElementsByClassName('wordnum')[0].value === "" ){
                    real_num = 50;
                }else if(Number(document.getElementsByClassName('wordnum')[0].value) > 50){
                    real_num = 50;
                }else if(Number(document.getElementsByClassName('wordnum')[0].value) === 0){
                    real_num = 50;
                }      
                else{
                    real_num = Number(document.getElementsByClassName('wordnum')[0].value);
                }

                if(qnum < real_num){ //주어진 단어갯수보다 작아야 됨
                                            let total_pv_num = grammar_JSON.length;
                                            let random = Math.floor(Math.random()*(total_pv_num))+1;
                                            if(document.getElementById('pv_korean').checked){
                                                head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                                                prob = grammar_JSON[random].eng;
                                                firstbody.innerHTML = '<span id="capital">'+grammar_JSON[random].eng+'</span>';
                                                answertext = grammar_JSON[random].kor;
                                                grammar_JSON.splice(random,1);
                                                //나머지 3가지 보기를 만듬
                                                Temp_JSON = grammar_JSON;
                                                let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p1text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p2text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p3text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                            }else if(document.getElementById('pv_english').checked){
                                                head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                                                prob = grammar_JSON[random].kor
                                                firstbody.innerHTML = '<span id="capital">'+prob+'</span>';
                                                answertext = grammar_JSON[random].eng;
                                                grammar_JSON.splice(random,1);
                                                //나머지 3가지 보기를 만듬
                                                Temp_JSON = grammar_JSON;
                                                let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p1text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p2text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p3text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                            }else{
                                                let ke_random = Math.floor(Math.random()*2);
                                                if(ke_random === 0){ //0이면 뜻 맞추기
                                                    head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                                                    prob = grammar_JSON[random].eng;
                                                    firstbody.innerHTML = '<span id="capital">'+grammar_JSON[random].eng+'</span>';
                                                    answertext = grammar_JSON[random].kor;
                                                    grammar_JSON.splice(random,1);
                                                    //나머지 3가지 보기를 만듬
                                                    Temp_JSON = grammar_JSON;
                                                    let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p1text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p2text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p3text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                }else{ // 1이면 영어 맞추기
                                                    head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                                                    prob = grammar_JSON[random].kor;
                                                    firstbody.innerHTML = '<span id="capital">'+grammar_JSON[random].kor+'</span>';
                                                    answertext = grammar_JSON[random].eng;
                                                    grammar_JSON.splice(random,1);                                            
                                                    //나머지 3가지 보기를 만듬
                                                    Temp_JSON = grammar_JSON;
                                                    let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p1text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p2text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p3text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                }
                                            }
                                        }

                                        pvanswer = answerrandom;

                                        if(answerrandom === 1){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv0_click(1,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv0_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv0_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv0_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else if(answerrandom === 2){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv0_click(1,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv0_click(2,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv0_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv0_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else if(answerrandom === 3){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv0_click(1,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv0_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv0_click(3,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv0_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else{
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv0_click(1,'${prob}','${answertext}','${p3text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv0_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv0_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv0_click(4,'${prob}','${answertext}','${answertext}')">`;
                                        }

                // 완료되면 제출버튼 표시
                if(qnum === real_num){
                    button.innerHTML = '<input type="button" id="bodybutton" onclick="pv0_done()" value="제출">';
                    firstbody.innerHTML = '<div id="pushbutton">아래 제출 버튼을 누르세요.</div>';
                    secondbody.innerHTML = '';
                }
            }
            
            function pv0_done(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                //점수 계산 후 표시
                scores = Math.floor((correct / qnum)*100);
                table = table + 'Voca Basic Test 정답률 : ' + scores + "% <hr>";

                result.innerHTML = table;
                button.innerHTML = "";

                total_result.push(["Voca0",scores,answers]);

                //문제가 정해진 갯수만큼 출제되었을때 기본시험인 경우 무조건 PV1으로,..
                //PV1인 경우 그외에는 체점이 70점 상이면 PV2 시험 진행, 아니면 PV1을 선택
                //PV2~PV4인 경우 70점 이상이면 다음 시험 진행, 30점(?)이하이고 아랫단계를 진행하지 않았다면 진행, 그 사이 이면 해당교재선택
                //PV5인 경우 70점 이상이면 PV6으로 추천, 30점(?)이하이고 아랫단계를 진행하지 않았다면 진행, 그 사이 이면 PV5추천
                
                pv1_start();
            }

            function pv1_start(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;
                let answerrandom = Math.floor(Math.random()*4)+1; //1~4 중 정답이 들어갈 번호
            
                let answertext; //정답문자
                let p1text;     //보기1문자
                let p2text;     //보기2문자
                let p3text;     //보기3문자

                let prob;

                phonics3count = 0;

                answers = "";
                qnum = 0;
                correct = 0;

                title.innerText = "Power Vocal 1 Level Test를 시작합니다.";

                // test 파일 불러와서 json 파일로 만들기
                let selectedFile = new XMLHttpRequest();
                //selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/level_test_grammar_1.xlsx");
                selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/data/pv1.xlsx"); //파일명의 길이도 문제가 되는 것 같음. 짧게 유지
                //selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/data/test.xlsx");
                selectedFile.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
                selectedFile.responseType = "blob"; //Blob형식으로 부탁합니다!
                selectedFile.send();  //위 요청을 보낸다.

                selectedFile.onload = function(){ 

                    if(selectedFile.status === 200){

                        let blob = new Blob([selectedFile.response], {type:'application/xlsx'}); //받은 파일의 내용을 blob 형태로 변환

                        if(blob.size>0){
                            let fileReader = new FileReader();
                            fileReader.readAsBinaryString(blob);                    
                            fileReader.onload = (event)=>{
                                let data = event.target.result;
                                let workbook = XLSX.read(data,{type:"binary"});
                                let nottwice = true;
                                workbook.SheetNames.forEach(sheet => {
                                    //console.log("sheet=>"+sheet);
                                    let Temp_JSON;
                                    if(nottwice){
                                        sheet = 'pv_1';
                                        let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                                        let jsonexcelfile = JSON.stringify(rowObject, undefined, 4);
                                        let jsonexcelfileparse = JSON.parse(jsonexcelfile);

                                        grammar_JSON = JSON.parse(jsonexcelfile);
                                        //console.log(jsonexcelfileparse);
                                        //document.getElementById("jsondata").innerHTML = jsonexcelfile;
                                        //console.log(jsonexcelfileparse[0].no);
                                        let real_num;
                                        if(document.getElementsByClassName('wordnum')[0].value === "" ){
                                            real_num = 50;
                                        }else if( Number(document.getElementsByClassName('wordnum')[0].value) > 50){
                                            real_num = 50;
                                        }else if(Number(document.getElementsByClassName('wordnum')[0].value) <= 0){
                                            real_num = 50;
                                        }
                                        else{
                                            real_num = Number(document.getElementsByClassName('wordnum')[0].value);
                                        }

                                        if(qnum < real_num){ //주어진 단어갯수보다 작아야 됨
                                            let total_pv_num = grammar_JSON.length;
                                            let random = Math.floor(Math.random()*(total_pv_num))+1;
                                            if(document.getElementById('pv_korean').checked){
                                                head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                                                prob = grammar_JSON[random].eng;
                                                firstbody.innerHTML = '<span id="capital">'+grammar_JSON[random].eng+'</span>';
                                                answertext = grammar_JSON[random].kor;
                                                grammar_JSON.splice(random,1);
                                                //나머지 3가지 보기를 만듬
                                                Temp_JSON = grammar_JSON;
                                                let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p1text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p2text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p3text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                            }else if(document.getElementById('pv_english').checked){
                                                head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                                                prob = grammar_JSON[random].kor
                                                firstbody.innerHTML = '<span id="capital">'+prob+'</span>';
                                                answertext = grammar_JSON[random].eng;
                                                grammar_JSON.splice(random,1);
                                                //나머지 3가지 보기를 만듬
                                                Temp_JSON = grammar_JSON;
                                                let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p1text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p2text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p3text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                            }else{
                                                let ke_random = Math.floor(Math.random()*2);
                                                if(ke_random === 0){ //0이면 뜻 맞추기
                                                    head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                                                    prob = grammar_JSON[random].eng;
                                                    firstbody.innerHTML = '<span id="capital">'+grammar_JSON[random].eng+'</span>';
                                                    answertext = grammar_JSON[random].kor;
                                                    grammar_JSON.splice(random,1);
                                                    //나머지 3가지 보기를 만듬
                                                    Temp_JSON = grammar_JSON;
                                                    let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p1text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p2text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p3text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                }else{ // 1이면 영어 맞추기
                                                    head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                                                    prob = grammar_JSON[random].kor;
                                                    firstbody.innerHTML = '<span id="capital">'+grammar_JSON[random].kor+'</span>';
                                                    answertext = grammar_JSON[random].eng;
                                                    grammar_JSON.splice(random,1);                                            
                                                    //나머지 3가지 보기를 만듬
                                                    Temp_JSON = grammar_JSON;
                                                    let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p1text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p2text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p3text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                }
                                            }
                                        }

                                        pvanswer = answerrandom;

                                        if(answerrandom === 1){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv1_click(1,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv1_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv1_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv1_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else if(answerrandom === 2){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv1_click(1,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv1_click(2,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv1_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv1_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else if(answerrandom === 3){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv1_click(1,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv1_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv1_click(3,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv1_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else{
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv1_click(1,'${prob}','${answertext}','${p3text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv1_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv1_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv1_click(4,'${prob}','${answertext}','${answertext}')">`;
                                        }


                                        //secondbody.innerHTML = jsonexcelfileparse[qnum].w;
                                        /*let total_pv_num = grammar_JSON.length-1;
                                        let random = Math.floor(Math.random()*(total_pv_num))+1;

                                        secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a1}" onclick="pv0_click(1)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a2}" onclick="pv0_click(2)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a3}" onclick="pv0_click(3)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a4}" onclick="pv0_click(4)">`;
                                        
                                        //button.innerHTML = '<input type="button" id="bodybutton" onclick="grammar3_start()" value="제출">'*/
                                        nottwice = false;
                                    }
                                });
                            }
                        }
                    }
                }
                //여기까지 파일 불러와서 jsonexcelfileparse에 저장 하기
            }

            function pv1_click(useranswer,proba,correctanswera,useranswera){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;
                let answerrandom = Math.floor(Math.random()*4)+1; //1~4 중 정답이 들어갈 번호
            
                let answertext; //정답문자
                let p1text;     //보기1문자
                let p2text;     //보기2문자
                let p3text;     //보기3문자

                let prob;

                //정답체크
                if(pvanswer === useranswer){
                    correct ++;
                }

                answers = answers + (qnum+1) + `번.문제(${proba})-대답(${useranswer}:${useranswera})-정답(${pvanswer}:${correctanswera})/`; 

                qnum++;

                //다음문제작성

                let real_num;
                if(document.getElementsByClassName('wordnum')[0].value === "" ){
                    real_num = 50;
                }else if(Number(document.getElementsByClassName('wordnum')[0].value) > 50){
                    real_num = 50;
                }else if(Number(document.getElementsByClassName('wordnum')[0].value) === 0){
                    real_num = 50;
                }      
                else{
                    real_num = Number(document.getElementsByClassName('wordnum')[0].value);
                }

                if(qnum < real_num){ //주어진 단어갯수보다 작아야 됨
                                            let total_pv_num = grammar_JSON.length;
                                            let random = Math.floor(Math.random()*(total_pv_num))+1;
                                            if(document.getElementById('pv_korean').checked){
                                                head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                                                prob = grammar_JSON[random].eng;
                                                firstbody.innerHTML = '<span id="capital">'+grammar_JSON[random].eng+'</span>';
                                                answertext = grammar_JSON[random].kor;
                                                grammar_JSON.splice(random,1);
                                                //나머지 3가지 보기를 만듬
                                                Temp_JSON = grammar_JSON;
                                                let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p1text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p2text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p3text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                            }else if(document.getElementById('pv_english').checked){
                                                head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                                                prob = grammar_JSON[random].kor
                                                firstbody.innerHTML = '<span id="capital">'+prob+'</span>';
                                                answertext = grammar_JSON[random].eng;
                                                grammar_JSON.splice(random,1);
                                                //나머지 3가지 보기를 만듬
                                                Temp_JSON = grammar_JSON;
                                                let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p1text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p2text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p3text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                            }else{
                                                let ke_random = Math.floor(Math.random()*2);
                                                if(ke_random === 0){ //0이면 뜻 맞추기
                                                    head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                                                    prob = grammar_JSON[random].eng;
                                                    firstbody.innerHTML = '<span id="capital">'+grammar_JSON[random].eng+'</span>';
                                                    answertext = grammar_JSON[random].kor;
                                                    grammar_JSON.splice(random,1);
                                                    //나머지 3가지 보기를 만듬
                                                    Temp_JSON = grammar_JSON;
                                                    let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p1text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p2text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p3text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                }else{ // 1이면 영어 맞추기
                                                    head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                                                    prob = grammar_JSON[random].kor;
                                                    firstbody.innerHTML = '<span id="capital">'+grammar_JSON[random].kor+'</span>';
                                                    answertext = grammar_JSON[random].eng;
                                                    grammar_JSON.splice(random,1);                                            
                                                    //나머지 3가지 보기를 만듬
                                                    Temp_JSON = grammar_JSON;
                                                    let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p1text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p2text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p3text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                }
                                            }
                                        }

                                        pvanswer = answerrandom;

                                        if(answerrandom === 1){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv1_click(1,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv1_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv1_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv1_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else if(answerrandom === 2){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv1_click(1,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv1_click(2,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv1_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv1_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else if(answerrandom === 3){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv1_click(1,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv1_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv1_click(3,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv1_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else{
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv1_click(1,'${prob}','${answertext}','${p3text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv1_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv1_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv1_click(4,'${prob}','${answertext}','${answertext}')">`;
                                        }

                // 완료되면 제출버튼 표시
                if(qnum === real_num){
                    button.innerHTML = '<input type="button" id="bodybutton" onclick="pv1_done()" value="제출">';
                    firstbody.innerHTML = '<div id="pushbutton">아래 제출 버튼을 누르세요.</div>';
                    secondbody.innerHTML = '';
                }
            }
            
            function pv1_done(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                //점수 계산 후 표시
                scores = Math.floor((correct / qnum)*100);
                table = table + 'Power Voca 1 Test 정답률 : ' + scores + "% <hr>";

                result.innerHTML = table;
                button.innerHTML = "";

                total_result.push(["Voca1",scores,answers]);

                pv1done = true;
                //문제가 정해진 갯수만큼 출제되었을때 기본시험인 경우 무조건 PV1으로,..
                //PV1인 경우 그외에는 체점이 70점 상이면 PV2 시험 진행, 아니면 PV1을 선택
                //PV2~PV4인 경우 70점 이상이면 다음 시험 진행, 30점(?)이하이고 아랫단계를 진행하지 않았다면 진행, 그 사이 이면 해당교재선택
                //PV5인 경우 70점 이상이면 PV6으로 추천, 30점(?)이하이고 아랫단계를 진행하지 않았다면 진행, 그 사이 이면 PV5추천
                
                if(scores > 70){
                    pv2_start();
                }else{
                    voca_choice = "Power Voca 1";

                    if(document.getElementById('middle').checked){                    
                        title.innerText = "중등실력 Test를 시작합니다.";
                        middle_test();
                    } else if(document.getElementById('rtst').checked){                    
                        title.innerText = "한솔플러스영어 교재선택을 위한 Test를 시작합니다.";
                        rtst_test();
                    } else{
                        alert("더 이상 출제된 시험이 없습니다.");
                        button.innerHTML = '<input type="button" id="bodybutton" onclick="printresult()" value="결과보기">';
                        body.innerHTML = '<div id="pushbutton">아래 결과보기 버튼을 누르세요.</div>';
                }   
                }
            }

            function pv2_start(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;
                let answerrandom = Math.floor(Math.random()*4)+1; //1~4 중 정답이 들어갈 번호
            
                let answertext; //정답문자
                let p1text;     //보기1문자
                let p2text;     //보기2문자
                let p3text;     //보기3문자

                let prob;

                phonics3count = 0;

                answers = "";
                qnum = 0;
                correct = 0;

                title.innerText = "Power Vocal 2 Level Test를 시작합니다.";

                // test 파일 불러와서 json 파일로 만들기
                let selectedFile = new XMLHttpRequest();
                //selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/data/level_test_grammar_1.xlsx");
                selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/data/pv2.xlsx"); //파일명의 길이도 문제가 되는 것 같음. 짧게 유지
                //selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/data/test.xlsx");
                selectedFile.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
                selectedFile.responseType = "blob"; //Blob형식으로 부탁합니다!
                selectedFile.send();  //위 요청을 보낸다.

                selectedFile.onload = function(){ 

                    if(selectedFile.status === 200){

                        let blob = new Blob([selectedFile.response], {type:'application/xlsx'}); //받은 파일의 내용을 blob 형태로 변환

                        if(blob.size>0){
                            let fileReader = new FileReader();
                            fileReader.readAsBinaryString(blob);                    
                            fileReader.onload = (event)=>{
                                let data = event.target.result;
                                let workbook = XLSX.read(data,{type:"binary"});
                                let nottwice = true;
                                workbook.SheetNames.forEach(sheet => {
                                    //console.log("sheet=>"+sheet);
                                    let Temp_JSON;
                                    if(nottwice){
                                        sheet = 'pv_2';
                                        let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                                        let jsonexcelfile = JSON.stringify(rowObject, undefined, 4);
                                        let jsonexcelfileparse = JSON.parse(jsonexcelfile);

                                        grammar_JSON = JSON.parse(jsonexcelfile);
                                        //console.log(jsonexcelfileparse);
                                        //document.getElementById("jsondata").innerHTML = jsonexcelfile;
                                        //console.log(jsonexcelfileparse[0].no);
                                        let real_num;
                                        if(document.getElementsByClassName('wordnum')[0].value === "" ){
                                            real_num = 50;
                                        }else if( Number(document.getElementsByClassName('wordnum')[0].value) > 50){
                                            real_num = 50;
                                        }else if(Number(document.getElementsByClassName('wordnum')[0].value) <= 0){
                                            real_num = 50;
                                        }
                                        else{
                                            real_num = Number(document.getElementsByClassName('wordnum')[0].value);
                                        }

                                        if(qnum < real_num){ //주어진 단어갯수보다 작아야 됨
                                            let total_pv_num = grammar_JSON.length;
                                            let random = Math.floor(Math.random()*(total_pv_num))+1;
                                            if(document.getElementById('pv_korean').checked){
                                                head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                                                prob = grammar_JSON[random].eng
                                                firstbody.innerHTML = '<span id="capital">'+grammar_JSON[random].eng+'</span>';
                                                answertext = grammar_JSON[random].kor;
                                                grammar_JSON.splice(random,1);
                                                //나머지 3가지 보기를 만듬
                                                Temp_JSON = grammar_JSON;
                                                let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p1text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p2text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p3text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                            }else if(document.getElementById('pv_english').checked){
                                                head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                                                prob = grammar_JSON[random].kor
                                                firstbody.innerHTML = '<span id="capital">'+prob+'</span>';
                                                answertext = grammar_JSON[random].eng;
                                                grammar_JSON.splice(random,1);
                                                //나머지 3가지 보기를 만듬
                                                Temp_JSON = grammar_JSON;
                                                let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p1text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p2text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p3text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                            }else{
                                                let ke_random = Math.floor(Math.random()*2);
                                                if(ke_random === 0){ //0이면 뜻 맞추기
                                                    head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                                                    prob = grammar_JSON[random].eng;
                                                    firstbody.innerHTML = '<span id="capital">'+grammar_JSON[random].eng+'</span>';
                                                    answertext = grammar_JSON[random].kor;
                                                    grammar_JSON.splice(random,1);
                                                    //나머지 3가지 보기를 만듬
                                                    Temp_JSON = grammar_JSON;
                                                    let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p1text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p2text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p3text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                }else{ // 1이면 영어 맞추기
                                                    head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                                                    prob = grammar_JSON[random].kor;
                                                    firstbody.innerHTML = '<span id="capital">'+grammar_JSON[random].kor+'</span>';
                                                    answertext = grammar_JSON[random].eng;
                                                    grammar_JSON.splice(random,1);                                            
                                                    //나머지 3가지 보기를 만듬
                                                    Temp_JSON = grammar_JSON;
                                                    let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p1text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p2text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p3text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                }
                                            }
                                        }

                                        pvanswer = answerrandom;

                                        if(answerrandom === 1){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv2_click(1,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv2_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv2_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv2_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else if(answerrandom === 2){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv2_click(1,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv2_click(2,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv2_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv2_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else if(answerrandom === 3){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv2_click(1,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv2_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv2_click(3,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv2_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else{
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv2_click(1,'${prob}','${answertext}','${p3text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv2_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv2_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv2_click(4,'${prob}','${answertext}','${answertext}')">`;
                                        }

                                        //secondbody.innerHTML = jsonexcelfileparse[qnum].w;
                                        /*let total_pv_num = grammar_JSON.length-1;
                                        let random = Math.floor(Math.random()*(total_pv_num))+1;

                                        secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a1}" onclick="pv0_click(1)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a2}" onclick="pv0_click(2)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a3}" onclick="pv0_click(3)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a4}" onclick="pv0_click(4)">`;
                                        
                                        //button.innerHTML = '<input type="button" id="bodybutton" onclick="grammar3_start()" value="제출">'*/
                                        nottwice = false;
                                    }
                                });
                            }
                        }
                    }
                }
                //여기까지 파일 불러와서 jsonexcelfileparse에 저장 하기
            }

            function pv2_click(useranswer,proba,correctanswera,useranswera) {
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;
                let answerrandom = Math.floor(Math.random()*4)+1; //1~4 중 정답이 들어갈 번호
            
                let answertext; //정답문자
                let p1text;     //보기1문자
                let p2text;     //보기2문자
                let p3text;     //보기3문자

                let prob;

                //정답체크
                if(pvanswer === useranswer){
                    correct ++;
                }

                answers = answers + (qnum+1) + `번.문제(${proba})-대답(${useranswer}:${useranswera})-정답(${pvanswer}:${correctanswera})/`; 

                qnum++;

                //다음문제작성

                let real_num;
                if(document.getElementsByClassName('wordnum')[0].value === "" ){
                    real_num = 50;
                }else if(Number(document.getElementsByClassName('wordnum')[0].value) > 50){
                    real_num = 50;
                }else if(Number(document.getElementsByClassName('wordnum')[0].value) === 0){
                    real_num = 50;
                }      
                else{
                    real_num = Number(document.getElementsByClassName('wordnum')[0].value);
                }

                if(qnum < real_num){ //주어진 단어갯수보다 작아야 됨
                                            let total_pv_num = grammar_JSON.length;
                                            let random = Math.floor(Math.random()*(total_pv_num))+1;
                                            if(document.getElementById('pv_korean').checked){
                                                head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                                                prob = '<span id="capital">'+grammar_JSON[random].eng+'</span>';
                                                firstbody.innerHTML = grammar_JSON[random].eng;
                                                answertext = grammar_JSON[random].kor;
                                                grammar_JSON.splice(random,1);
                                                //나머지 3가지 보기를 만듬
                                                Temp_JSON = grammar_JSON;
                                                let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p1text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p2text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p3text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                            }else if(document.getElementById('pv_english').checked){
                                                head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                                                prob = grammar_JSON[random].kor
                                                firstbody.innerHTML = prob;
                                                answertext = grammar_JSON[random].eng;
                                                grammar_JSON.splice(random,1);
                                                //나머지 3가지 보기를 만듬
                                                Temp_JSON = grammar_JSON;
                                                let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p1text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p2text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p3text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                            }else{
                                                let ke_random = Math.floor(Math.random()*2);
                                                if(ke_random === 0){ //0이면 뜻 맞추기
                                                    head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                                                    prob = grammar_JSON[random].eng;
                                                    firstbody.innerHTML = grammar_JSON[random].eng;
                                                    answertext = grammar_JSON[random].kor;
                                                    grammar_JSON.splice(random,1);
                                                    //나머지 3가지 보기를 만듬
                                                    Temp_JSON = grammar_JSON;
                                                    let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p1text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p2text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p3text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                }else{ // 1이면 영어 맞추기
                                                    head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                                                    prob = grammar_JSON[random].kor;
                                                    firstbody.innerHTML = grammar_JSON[random].kor;
                                                    answertext = grammar_JSON[random].eng;
                                                    grammar_JSON.splice(random,1);                                            
                                                    //나머지 3가지 보기를 만듬
                                                    Temp_JSON = grammar_JSON;
                                                    let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p1text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p2text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p3text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                }
                                            }
                                        }

                                        pvanswer = answerrandom;

                                        if(answerrandom === 1){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv2_click(1,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv2_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv2_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv2_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else if(answerrandom === 2){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv2_click(1,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv2_click(2,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv2_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv2_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else if(answerrandom === 3){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv2_click(1,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv2_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv2_click(3,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv2_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else{
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv2_click(1,'${prob}','${answertext}','${p3text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv2_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv2_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv2_click(4,'${prob}','${answertext}','${answertext}')">`;
                                        }

                // 완료되면 제출버튼 표시
                if(qnum === real_num){
                    button.innerHTML = '<input type="button" id="bodybutton" onclick="pv2_done()" value="제출">';
                    firstbody.innerHTML = '<div id="pushbutton">아래 제출 버튼을 누르세요.</div>';
                    secondbody.innerHTML = '';
                }
            }
            
            function pv2_done(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                //점수 계산 후 표시
                scores = Math.floor((correct / qnum)*100);
                table = table + 'Power Voca 2 Test 정답률 : ' + scores + "% <hr>";

                result.innerHTML = table;
                button.innerHTML = "";

                total_result.push(["Voca2",scores,answers]);

                pv2done = true;
                //문제가 정해진 갯수만큼 출제되었을때 기본시험인 경우 무조건 PV1으로,..
                //PV1인 경우 그외에는 체점이 70점 상이면 PV2 시험 진행, 아니면 PV1을 선택
                //PV2~PV4인 경우 70점 이상이면 다음 시험 진행, 30점(?)이하이고 아랫단계를 진행하지 않았다면 진행, 그 사이 이면 해당교재선택
                //PV5인 경우 70점 이상이면 PV6으로 추천, 30점(?)이하이고 아랫단계를 진행하지 않았다면 진행, 그 사이 이면 PV5추천

                if(scores > 70){
                    pv3_start();
                }else if(scores < 30){
                    if(pv1done){
                        voca_choice = "Power Voca 2";
                    }else{
                        pv1_start();
                    }
                }else{
                    voca_choice = "Power Voca 2";

                    if(document.getElementById('middle').checked){                    
                        title.innerText = "중등실력 Test를 시작합니다.";
                        middle_test();
                    } else if(document.getElementById('rtst').checked){                    
                        title.innerText = "한솔플러스영어 교재선택을 위한 Test를 시작합니다.";
                        rtst_test();
                    } else{
                        alert("더 이상 출제된 시험이 없습니다.");
                        button.innerHTML = '<input type="button" id="bodybutton" onclick="printresult()" value="결과보기">';
                        body.innerHTML = '<div id="pushbutton">아래 결과보기 버튼을 누르세요.</div>';
                }   
                }

            }

            function pv3_start(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;
                let answerrandom = Math.floor(Math.random()*4)+1; //1~4 중 정답이 들어갈 번호
            
                let answertext; //정답문자
                let p1text;     //보기1문자
                let p2text;     //보기2문자
                let p3text;     //보기3문자

                let prob;

                phonics3count = 0;

                answers = "";
                qnum = 0;
                correct = 0;

                title.innerText = "Power Vocal 3 Level Test를 시작합니다.";

                // test 파일 불러와서 json 파일로 만들기
                let selectedFile = new XMLHttpRequest();
                //selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/data/level_test_grammar_1.xlsx");
                selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/data/pv3.xlsx"); //파일명의 길이도 문제가 되는 것 같음. 짧게 유지
                //selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/data/test.xlsx");
                selectedFile.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
                selectedFile.responseType = "blob"; //Blob형식으로 부탁합니다!
                selectedFile.send();  //위 요청을 보낸다.

                selectedFile.onload = function(){ 

                    if(selectedFile.status === 200){

                        let blob = new Blob([selectedFile.response], {type:'application/xlsx'}); //받은 파일의 내용을 blob 형태로 변환

                        if(blob.size>0){
                            let fileReader = new FileReader();
                            fileReader.readAsBinaryString(blob);                    
                            fileReader.onload = (event)=>{
                                let data = event.target.result;
                                let workbook = XLSX.read(data,{type:"binary"});
                                let nottwice = true;
                                workbook.SheetNames.forEach(sheet => {
                                    //console.log("sheet=>"+sheet);
                                    let Temp_JSON;
                                    if(nottwice){
                                        sheet = 'pv_3';
                                        let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                                        let jsonexcelfile = JSON.stringify(rowObject, undefined, 4);
                                        let jsonexcelfileparse = JSON.parse(jsonexcelfile);

                                        grammar_JSON = JSON.parse(jsonexcelfile);
                                        //console.log(jsonexcelfileparse);
                                        //document.getElementById("jsondata").innerHTML = jsonexcelfile;
                                        //console.log(jsonexcelfileparse[0].no);
                                        let real_num;
                                        if(document.getElementsByClassName('wordnum')[0].value === "" ){
                                            real_num = 50;
                                        }else if( Number(document.getElementsByClassName('wordnum')[0].value) > 50){
                                            real_num = 50;
                                        }else if(Number(document.getElementsByClassName('wordnum')[0].value) <= 0){
                                            real_num = 50;
                                        }
                                        else{
                                            real_num = Number(document.getElementsByClassName('wordnum')[0].value);
                                        }

                                        if(qnum < real_num){ //주어진 단어갯수보다 작아야 됨
                                            let total_pv_num = grammar_JSON.length;
                                            let random = Math.floor(Math.random()*(total_pv_num))+1;
                                            if(document.getElementById('pv_korean').checked){
                                                head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                                                prob = grammar_JSON[random].eng
                                                firstbody.innerHTML = grammar_JSON[random].eng;
                                                answertext = grammar_JSON[random].kor;
                                                grammar_JSON.splice(random,1);
                                                //나머지 3가지 보기를 만듬
                                                Temp_JSON = grammar_JSON;
                                                let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p1text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p2text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p3text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                            }else if(document.getElementById('pv_english').checked){
                                                head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                                                prob = grammar_JSON[random].kor
                                                firstbody.innerHTML = prob;
                                                answertext = grammar_JSON[random].eng;
                                                grammar_JSON.splice(random,1);
                                                //나머지 3가지 보기를 만듬
                                                Temp_JSON = grammar_JSON;
                                                let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p1text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p2text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p3text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                            }else{
                                                let ke_random = Math.floor(Math.random()*2);
                                                if(ke_random === 0){ //0이면 뜻 맞추기
                                                    head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                                                    prob = grammar_JSON[random].eng;
                                                    firstbody.innerHTML = grammar_JSON[random].eng;
                                                    answertext = grammar_JSON[random].kor;
                                                    grammar_JSON.splice(random,1);
                                                    //나머지 3가지 보기를 만듬
                                                    Temp_JSON = grammar_JSON;
                                                    let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p1text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p2text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p3text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                }else{ // 1이면 영어 맞추기
                                                    head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                                                    prob = grammar_JSON[random].kor;
                                                    firstbody.innerHTML = grammar_JSON[random].kor;
                                                    answertext = grammar_JSON[random].eng;
                                                    grammar_JSON.splice(random,1);                                            
                                                    //나머지 3가지 보기를 만듬
                                                    Temp_JSON = grammar_JSON;
                                                    let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p1text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p2text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p3text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                }
                                            }
                                        }

                                        pvanswer = answerrandom;

                                        if(answerrandom === 1){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv3_click(1,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv3_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv3_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv3_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else if(answerrandom === 2){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv3_click(1,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv3_click(2,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv3_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv3_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else if(answerrandom === 3){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv3_click(1,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv3_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv3_click(3,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv3_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else{
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv3_click(1,'${prob}','${answertext}','${p3text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv3_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv3_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv3_click(4,'${prob}','${answertext}','${answertext}')">`;
                                        }

                                        //secondbody.innerHTML = jsonexcelfileparse[qnum].w;
                                        /*let total_pv_num = grammar_JSON.length-1;
                                        let random = Math.floor(Math.random()*(total_pv_num))+1;

                                        secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a1}" onclick="pv0_click(1)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a2}" onclick="pv0_click(2)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a3}" onclick="pv0_click(3)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a4}" onclick="pv0_click(4)">`;
                                        
                                        //button.innerHTML = '<input type="button" id="bodybutton" onclick="grammar3_start()" value="제출">'*/
                                        nottwice = false;
                                    }
                                });
                            }
                        }
                    }
                }
                //여기까지 파일 불러와서 jsonexcelfileparse에 저장 하기
            }

            function pv3_click(useranswer,proba,correctanswera,useranswera) {
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;
                let answerrandom = Math.floor(Math.random()*4)+1; //1~4 중 정답이 들어갈 번호
            
                let answertext; //정답문자
                let p1text;     //보기1문자
                let p2text;     //보기2문자
                let p3text;     //보기3문자

                let prob;

                //정답체크
                if(pvanswer === useranswer){
                    correct ++;
                }

                answers = answers + (qnum+1) + `번.문제(${proba})-대답(${useranswer}:${useranswera})-정답(${pvanswer}:${correctanswera})/`; 

                qnum++;

                //다음문제작성

                let real_num;
                if(document.getElementsByClassName('wordnum')[0].value === "" ){
                    real_num = 50;
                }else if(Number(document.getElementsByClassName('wordnum')[0].value) > 50){
                    real_num = 50;
                }else if(Number(document.getElementsByClassName('wordnum')[0].value) === 0){
                    real_num = 50;
                }      
                else{
                    real_num = Number(document.getElementsByClassName('wordnum')[0].value);
                }

                if(qnum < real_num){ //주어진 단어갯수보다 작아야 됨
                                            let total_pv_num = grammar_JSON.length;
                                            let random = Math.floor(Math.random()*(total_pv_num))+1;
                                            if(document.getElementById('pv_korean').checked){
                                                head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                                                prob = grammar_JSON[random].eng
                                                firstbody.innerHTML = grammar_JSON[random].eng;
                                                answertext = grammar_JSON[random].kor;
                                                grammar_JSON.splice(random,1);
                                                //나머지 3가지 보기를 만듬
                                                Temp_JSON = grammar_JSON;
                                                let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p1text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p2text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p3text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                            }else if(document.getElementById('pv_english').checked){
                                                head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                                                prob = grammar_JSON[random].kor
                                                firstbody.innerHTML = prob;
                                                answertext = grammar_JSON[random].eng;
                                                grammar_JSON.splice(random,1);
                                                //나머지 3가지 보기를 만듬
                                                Temp_JSON = grammar_JSON;
                                                let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p1text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p2text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p3text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                            }else{
                                                let ke_random = Math.floor(Math.random()*2);
                                                if(ke_random === 0){ //0이면 뜻 맞추기
                                                    head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                                                    prob = grammar_JSON[random].eng;
                                                    firstbody.innerHTML = grammar_JSON[random].eng;
                                                    answertext = grammar_JSON[random].kor;
                                                    grammar_JSON.splice(random,1);
                                                    //나머지 3가지 보기를 만듬
                                                    Temp_JSON = grammar_JSON;
                                                    let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p1text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p2text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p3text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                }else{ // 1이면 영어 맞추기
                                                    head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                                                    prob = grammar_JSON[random].kor;
                                                    firstbody.innerHTML = grammar_JSON[random].kor;
                                                    answertext = grammar_JSON[random].eng;
                                                    grammar_JSON.splice(random,1);                                            
                                                    //나머지 3가지 보기를 만듬
                                                    Temp_JSON = grammar_JSON;
                                                    let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p1text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p2text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p3text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                }
                                            }
                                        }

                                        pvanswer = answerrandom;

                                        if(answerrandom === 1){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv3_click(1,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv3_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv3_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv3_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else if(answerrandom === 2){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv3_click(1,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv3_click(2,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv3_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv3_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else if(answerrandom === 3){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv3_click(1,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv3_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv3_click(3,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv3_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else{
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv3_click(1,'${prob}','${answertext}','${p3text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv3_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv3_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv3_click(4,'${prob}','${answertext}','${answertext}')">`;
                                        }

                // 완료되면 제출버튼 표시
                if(qnum === real_num){
                    button.innerHTML = '<input type="button" id="bodybutton" onclick="pv3_done()" value="제출">';
                    firstbody.innerHTML = '<div id="pushbutton">아래 제출 버튼을 누르세요.</div>';
                    secondbody.innerHTML = '';
                }
            }
            
            function pv3_done(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                //점수 계산 후 표시
                scores = Math.floor((correct / qnum)*100);
                table = table + 'Power Voca 3 Test 정답률 : ' + scores + "% <hr>";

                result.innerHTML = table;
                button.innerHTML = "";

                total_result.push(["Voca3",scores,answers]);

                pv3done = true;

                //문제가 정해진 갯수만큼 출제되었을때 기본시험인 경우 무조건 PV1으로,..
                //PV1인 경우 그외에는 체점이 70점 상이면 PV2 시험 진행, 아니면 PV1을 선택
                //PV2~PV4인 경우 70점 이상이면 다음 시험 진행, 30점(?)이하이고 아랫단계를 진행하지 않았다면 진행, 그 사이 이면 해당교재선택
                //PV5인 경우 70점 이상이면 PV6으로 추천, 30점(?)이하이고 아랫단계를 진행하지 않았다면 진행, 그 사이 이면 PV5추천
                
                if(scores > 70){
                    pv4_start();
                }else if(scores < 30){
                    if(pv2done){
                        voca_choice = "Power Voca 3";
                    }else{
                        pv2_start();
                    }
                }else{
                    voca_choice = "Power Voca 3";

                    if(document.getElementById('middle').checked){                    
                        title.innerText = "중등실력 Test를 시작합니다.";
                        middle_test();
                    } else if(document.getElementById('rtst').checked){                    
                        title.innerText = "한솔플러스영어 교재선택을 위한 Test를 시작합니다.";
                        rtst_test();
                    } else{
                        alert("더 이상 출제된 시험이 없습니다.");
                        button.innerHTML = '<input type="button" id="bodybutton" onclick="printresult()" value="결과보기">';
                        body.innerHTML = '<div id="pushbutton">아래 결과보기 버튼을 누르세요.</div>';
                    }   
                }
            }

            function pv4_start(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;
                let answerrandom = Math.floor(Math.random()*4)+1; //1~4 중 정답이 들어갈 번호
            
                let answertext; //정답문자
                let p1text;     //보기1문자
                let p2text;     //보기2문자
                let p3text;     //보기3문자

                let prob;

                phonics3count = 0;

                answers = "";
                qnum = 0;
                correct = 0;

                title.innerText = "Power Vocal 4 Level Test를 시작합니다.";

                // test 파일 불러와서 json 파일로 만들기
                let selectedFile = new XMLHttpRequest();
                //selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/data/level_test_grammar_1.xlsx");
                selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/data/pv4.xlsx"); //파일명의 길이도 문제가 되는 것 같음. 짧게 유지
                //selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/data/test.xlsx");
                selectedFile.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
                selectedFile.responseType = "blob"; //Blob형식으로 부탁합니다!
                selectedFile.send();  //위 요청을 보낸다.

                selectedFile.onload = function(){ 

                    if(selectedFile.status === 200){

                        let blob = new Blob([selectedFile.response], {type:'application/xlsx'}); //받은 파일의 내용을 blob 형태로 변환

                        if(blob.size>0){
                            let fileReader = new FileReader();
                            fileReader.readAsBinaryString(blob);                    
                            fileReader.onload = (event)=>{
                                let data = event.target.result;
                                let workbook = XLSX.read(data,{type:"binary"});
                                let nottwice = true;
                                workbook.SheetNames.forEach(sheet => {
                                    //console.log("sheet=>"+sheet);
                                    let Temp_JSON;
                                    if(nottwice){
                                        sheet = 'pv_4';
                                        let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                                        let jsonexcelfile = JSON.stringify(rowObject, undefined, 4);
                                        let jsonexcelfileparse = JSON.parse(jsonexcelfile);

                                        grammar_JSON = JSON.parse(jsonexcelfile);
                                        //console.log(jsonexcelfileparse);
                                        //document.getElementById("jsondata").innerHTML = jsonexcelfile;
                                        //console.log(jsonexcelfileparse[0].no);
                                        let real_num;
                                        if(document.getElementsByClassName('wordnum')[0].value === "" ){
                                            real_num = 50;
                                        }else if( Number(document.getElementsByClassName('wordnum')[0].value) > 50){
                                            real_num = 50;
                                        }else if(Number(document.getElementsByClassName('wordnum')[0].value) <= 0){
                                            real_num = 50;
                                        }
                                        else{
                                            real_num = Number(document.getElementsByClassName('wordnum')[0].value);
                                        }

                                        if(qnum < real_num){ //주어진 단어갯수보다 작아야 됨
                                            let total_pv_num = grammar_JSON.length;
                                            let random = Math.floor(Math.random()*(total_pv_num))+1;
                                            if(document.getElementById('pv_korean').checked){
                                                head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                                                prob = grammar_JSON[random].eng
                                                firstbody.innerHTML = grammar_JSON[random].eng;
                                                answertext = grammar_JSON[random].kor;
                                                grammar_JSON.splice(random,1);
                                                //나머지 3가지 보기를 만듬
                                                Temp_JSON = grammar_JSON;
                                                let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p1text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p2text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p3text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                            }else if(document.getElementById('pv_english').checked){
                                                head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                                                prob = grammar_JSON[random].kor
                                                firstbody.innerHTML = prob;
                                                answertext = grammar_JSON[random].eng;
                                                grammar_JSON.splice(random,1);
                                                //나머지 3가지 보기를 만듬
                                                Temp_JSON = grammar_JSON;
                                                let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p1text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p2text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p3text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                            }else{
                                                let ke_random = Math.floor(Math.random()*2);
                                                if(ke_random === 0){ //0이면 뜻 맞추기
                                                    head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                                                    prob = grammar_JSON[random].eng;
                                                    firstbody.innerHTML = grammar_JSON[random].eng;
                                                    answertext = grammar_JSON[random].kor;
                                                    grammar_JSON.splice(random,1);
                                                    //나머지 3가지 보기를 만듬
                                                    Temp_JSON = grammar_JSON;
                                                    let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p1text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p2text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p3text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                }else{ // 1이면 영어 맞추기
                                                    head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                                                    prob = grammar_JSON[random].kor;
                                                    firstbody.innerHTML = grammar_JSON[random].kor;
                                                    answertext = grammar_JSON[random].eng;
                                                    grammar_JSON.splice(random,1);                                            
                                                    //나머지 3가지 보기를 만듬
                                                    Temp_JSON = grammar_JSON;
                                                    let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p1text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p2text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p3text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                }
                                            }
                                        }

                                        pvanswer = answerrandom;

                                        if(answerrandom === 1){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv4_click(1,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv4_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv4_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv4_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else if(answerrandom === 2){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv4_click(1,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv4_click(2,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv4_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv4_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else if(answerrandom === 3){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv4_click(1,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv4_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv4_click(3,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv4_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else{
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv4_click(1,'${prob}','${answertext}','${p3text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv4_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv4_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv4_click(4,'${prob}','${answertext}','${answertext}')">`;
                                        }

                                        //secondbody.innerHTML = jsonexcelfileparse[qnum].w;
                                        /*let total_pv_num = grammar_JSON.length-1;
                                        let random = Math.floor(Math.random()*(total_pv_num))+1;

                                        secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a1}" onclick="pv0_click(1)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a2}" onclick="pv0_click(2)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a3}" onclick="pv0_click(3)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a4}" onclick="pv0_click(4)">`;
                                        
                                        //button.innerHTML = '<input type="button" id="bodybutton" onclick="grammar3_start()" value="제출">'*/
                                        nottwice = false;
                                    }
                                });
                            }
                        }
                    }
                }
                //여기까지 파일 불러와서 jsonexcelfileparse에 저장 하기
            }

            function pv4_click(useranswer,proba,correctanswera,useranswera){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;
                let answerrandom = Math.floor(Math.random()*4)+1; //1~4 중 정답이 들어갈 번호
            
                let answertext; //정답문자
                let p1text;     //보기1문자
                let p2text;     //보기2문자
                let p3text;     //보기3문자

                let prob;

                //정답체크
                if(pvanswer === useranswer){
                    correct ++;
                }

                answers = answers + (qnum+1) + `번.문제(${proba})-대답(${useranswer}:${useranswera})-정답(${pvanswer}:${correctanswera})/`; 

                qnum++;

                //다음문제작성

                let real_num;
                if(document.getElementsByClassName('wordnum')[0].value === "" ){
                    real_num = 50;
                }else if(Number(document.getElementsByClassName('wordnum')[0].value) > 50){
                    real_num = 50;
                }else if(Number(document.getElementsByClassName('wordnum')[0].value) === 0){
                    real_num = 50;
                }      
                else{
                    real_num = Number(document.getElementsByClassName('wordnum')[0].value);
                }

                if(qnum < real_num){ //주어진 단어갯수보다 작아야 됨
                                            let total_pv_num = grammar_JSON.length;
                                            let random = Math.floor(Math.random()*(total_pv_num))+1;
                                            if(document.getElementById('pv_korean').checked){
                                                head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                                                prob = grammar_JSON[random].eng
                                                firstbody.innerHTML = grammar_JSON[random].eng;
                                                answertext = grammar_JSON[random].kor;
                                                grammar_JSON.splice(random,1);
                                                //나머지 3가지 보기를 만듬
                                                Temp_JSON = grammar_JSON;
                                                let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p1text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p2text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p3text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                            }else if(document.getElementById('pv_english').checked){
                                                head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                                                prob = grammar_JSON[random].kor
                                                firstbody.innerHTML = prob;
                                                answertext = grammar_JSON[random].eng;
                                                grammar_JSON.splice(random,1);
                                                //나머지 3가지 보기를 만듬
                                                Temp_JSON = grammar_JSON;
                                                let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p1text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p2text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p3text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                            }else{
                                                let ke_random = Math.floor(Math.random()*2);
                                                if(ke_random === 0){ //0이면 뜻 맞추기
                                                    head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                                                    prob = grammar_JSON[random].eng;
                                                    firstbody.innerHTML = grammar_JSON[random].eng;
                                                    answertext = grammar_JSON[random].kor;
                                                    grammar_JSON.splice(random,1);
                                                    //나머지 3가지 보기를 만듬
                                                    Temp_JSON = grammar_JSON;
                                                    let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p1text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p2text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p3text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                }else{ // 1이면 영어 맞추기
                                                    head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                                                    prob = grammar_JSON[random].kor;
                                                    firstbody.innerHTML = grammar_JSON[random].kor;
                                                    answertext = grammar_JSON[random].eng;
                                                    grammar_JSON.splice(random,1);                                            
                                                    //나머지 3가지 보기를 만듬
                                                    Temp_JSON = grammar_JSON;
                                                    let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p1text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p2text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p3text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                }
                                            }
                                        }

                                        pvanswer = answerrandom;

                                        if(answerrandom === 1){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv4_click(1,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv4_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv4_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv4_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else if(answerrandom === 2){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv4_click(1,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv4_click(2,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv4_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv4_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else if(answerrandom === 3){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv4_click(1,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv4_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv4_click(3,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv4_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else{
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv4_click(1,'${prob}','${answertext}','${p3text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv4_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv4_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv4_click(4,'${prob}','${answertext}','${answertext}')">`;
                                        }

                // 완료되면 제출버튼 표시
                if(qnum === real_num){
                    button.innerHTML = '<input type="button" id="bodybutton" onclick="pv4_done()" value="제출">';
                    firstbody.innerHTML = '<div id="pushbutton">아래 제출 버튼을 누르세요.</div>';
                    secondbody.innerHTML = '';
                }
            }
            
            function pv4_done(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                //점수 계산 후 표시
                scores = Math.floor((correct / qnum)*100);
                table = table + 'Power Voca 4 Test 정답률 : ' + scores + "% <hr>";

                result.innerHTML = table;
                button.innerHTML = "";

                total_result.push(["Voca4",scores,answers]);

                pv4done = true;
                //문제가 정해진 갯수만큼 출제되었을때 기본시험인 경우 무조건 PV1으로,..
                //PV1인 경우 그외에는 체점이 70점 상이면 PV2 시험 진행, 아니면 PV1을 선택
                //PV2~PV4인 경우 70점 이상이면 다음 시험 진행, 30점(?)이하이고 아랫단계를 진행하지 않았다면 진행, 그 사이 이면 해당교재선택
                //PV5인 경우 70점 이상이면 PV6으로 추천, 30점(?)이하이고 아랫단계를 진행하지 않았다면 진행, 그 사이 이면 PV5추천
                
                if(scores > 70){
                    pv5_start();
                }else if(scores < 30){
                    if(pv3done){
                        voca_choice = "Power Voca 4";
                    }else{
                        pv3_start();
                    }
                }else{
                    voca_choice = "Power Voca 4";

                    if(document.getElementById('middle').checked){                    
                        title.innerText = "중등실력 Test를 시작합니다.";
                        middle_test();
                    } else if(document.getElementById('rtst').checked){                    
                        title.innerText = "한솔플러스영어 교재선택을 위한 Test를 시작합니다.";
                        rtst_test();
                    } else{
                        alert("더 이상 출제된 시험이 없습니다.");
                        button.innerHTML = '<input type="button" id="bodybutton" onclick="printresult()" value="결과보기">';
                        body.innerHTML = '<div id="pushbutton">아래 결과보기 버튼을 누르세요.</div>';
                    }   
                }
            }

            function pv5_start(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;
                let answerrandom = Math.floor(Math.random()*4)+1; //1~4 중 정답이 들어갈 번호
            
                let answertext; //정답문자
                let p1text;     //보기1문자
                let p2text;     //보기2문자
                let p3text;     //보기3문자
                let p4text;     //보기4문자

                let prob;

                phonics3count = 0;

                answers = "";
                qnum = 0;
                correct = 0;

                title.innerText = "Power Vocal 5 Level Test를 시작합니다.";

                // test 파일 불러와서 json 파일로 만들기
                let selectedFile = new XMLHttpRequest();
                //selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/data/level_test_grammar_1.xlsx");
                selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/data/pv5.xlsx"); //파일명의 길이도 문제가 되는 것 같음. 짧게 유지
                //selectedFile.open("GET","https://yooyoogithub.github.io/HSPELT/data/test.xlsx");
                selectedFile.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
                selectedFile.responseType = "blob"; //Blob형식으로 부탁합니다!
                selectedFile.send();  //위 요청을 보낸다.

                selectedFile.onload = function(){ 

                    if(selectedFile.status === 200){

                        let blob = new Blob([selectedFile.response], {type:'application/xlsx'}); //받은 파일의 내용을 blob 형태로 변환

                        if(blob.size>0){
                            let fileReader = new FileReader();
                            fileReader.readAsBinaryString(blob);                    
                            fileReader.onload = (event)=>{
                                let data = event.target.result;
                                let workbook = XLSX.read(data,{type:"binary"});
                                let nottwice = true;
                                workbook.SheetNames.forEach(sheet => {
                                    //console.log("sheet=>"+sheet);
                                    let Temp_JSON;
                                    if(nottwice){
                                        sheet = 'pv_5';
                                        let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                                        let jsonexcelfile = JSON.stringify(rowObject, undefined, 4);
                                        let jsonexcelfileparse = JSON.parse(jsonexcelfile);

                                        grammar_JSON = JSON.parse(jsonexcelfile);
                                        //console.log(jsonexcelfileparse);
                                        //document.getElementById("jsondata").innerHTML = jsonexcelfile;
                                        //console.log(jsonexcelfileparse[0].no);
                                        let real_num;
                                        if(document.getElementsByClassName('wordnum')[0].value === "" ){
                                            real_num = 50;
                                        }else if( Number(document.getElementsByClassName('wordnum')[0].value) > 50){
                                            real_num = 50;
                                        }else if(Number(document.getElementsByClassName('wordnum')[0].value) <= 0){
                                            real_num = 50;
                                        }
                                        else{
                                            real_num = Number(document.getElementsByClassName('wordnum')[0].value);
                                        }

                                        if(qnum < real_num){ //주어진 단어갯수보다 작아야 됨
                                            let total_pv_num = grammar_JSON.length;
                                            let random = Math.floor(Math.random()*(total_pv_num))+1;
                                            if(document.getElementById('pv_korean').checked){
                                                head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                                                prob = grammar_JSON[random].eng
                                                firstbody.innerHTML = grammar_JSON[random].eng;
                                                answertext = grammar_JSON[random].kor;
                                                grammar_JSON.splice(random,1);
                                                //나머지 3가지 보기를 만듬
                                                Temp_JSON = grammar_JSON;
                                                let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p1text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p2text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p3text = Temp_JSON[random2].kor;
                                                Temp_JSON.splice(random2,1);
                                            }else if(document.getElementById('pv_english').checked){
                                                head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                                                prob = grammar_JSON[random].kor
                                                firstbody.innerHTML = prob;
                                                answertext = grammar_JSON[random].eng;
                                                grammar_JSON.splice(random,1);
                                                //나머지 3가지 보기를 만듬
                                                Temp_JSON = grammar_JSON;
                                                let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p1text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p2text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                                random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                p3text = Temp_JSON[random2].eng;
                                                Temp_JSON.splice(random2,1);
                                            }else{
                                                let ke_random = Math.floor(Math.random()*2);
                                                if(ke_random === 0){ //0이면 뜻 맞추기
                                                    head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                                                    prob = grammar_JSON[random].eng;
                                                    firstbody.innerHTML = grammar_JSON[random].eng;
                                                    answertext = grammar_JSON[random].kor;
                                                    grammar_JSON.splice(random,1);
                                                    //나머지 3가지 보기를 만듬
                                                    Temp_JSON = grammar_JSON;
                                                    let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p1text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p2text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p3text = Temp_JSON[random2].kor;
                                                    Temp_JSON.splice(random2,1);
                                                }else{ // 1이면 영어 맞추기
                                                    head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                                                    prob = grammar_JSON[random].kor;
                                                    firstbody.innerHTML = grammar_JSON[random].kor;
                                                    answertext = grammar_JSON[random].eng;
                                                    grammar_JSON.splice(random,1);                                            
                                                    //나머지 3가지 보기를 만듬
                                                    Temp_JSON = grammar_JSON;
                                                    let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p1text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p2text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                    random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                                                    p3text = Temp_JSON[random2].eng;
                                                    Temp_JSON.splice(random2,1);
                                                }
                                            }
                                        }

                                        pvanswer = answerrandom;

                                        if(answerrandom === 1){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv5_click(1,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv5_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv5_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv5_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else if(answerrandom === 2){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv5_click(1,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv5_click(2,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv5_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv5_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else if(answerrandom === 3){
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv5_click(1,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv5_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv5_click(3,'${prob}','${answertext}','${answertext}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv5_click(4,'${prob}','${answertext}','${p3text}')">`;
                                        }else{
                                            secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv5_click(1,'${prob}','${answertext}','${p3text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv5_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv5_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                                                `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv5_click(4,'${prob}','${answertext}','${answertext}')">`;
                                        }

                                        //secondbody.innerHTML = jsonexcelfileparse[qnum].w;
                                        /*let total_pv_num = grammar_JSON.length-1;
                                        let random = Math.floor(Math.random()*(total_pv_num))+1;

                                        secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a1}" onclick="pv0_click(1)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a2}" onclick="pv0_click(2)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a3}" onclick="pv0_click(3)"><br>`+
                                        `<input type="button" id="grammarbutton" value="${jsonexcelfileparse[qnum].a4}" onclick="pv0_click(4)">`;
                                        
                                        //button.innerHTML = '<input type="button" id="bodybutton" onclick="grammar3_start()" value="제출">'*/
                                        nottwice = false;
                                    }
                                });
                            }
                        }
                    }
                }
                //여기까지 파일 불러와서 jsonexcelfileparse에 저장 하기
            }

            function pv5_click(useranswer,proba,correctanswera,useranswera) {
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;
                let answerrandom = Math.floor(Math.random()*4)+1; //1~4 중 정답이 들어갈 번호
            
                let answertext; //정답문자
                let p1text;     //보기1문자
                let p2text;     //보기2문자
                let p3text;     //보기3문자

                let prob;

                //정답체크
                if(pvanswer === useranswer){
                    correct ++;
                }

                answers = answers + (qnum+1) + `번.문제(${proba})-대답(${useranswer}:${useranswera})-정답(${pvanswer}:${correctanswera})/`; 

                qnum++;

                //다음문제작성

                let real_num;
                if(document.getElementsByClassName('wordnum')[0].value === "" ){
                    real_num = 50;
                }else if(Number(document.getElementsByClassName('wordnum')[0].value) > 50){
                    real_num = 50;
                }else if(Number(document.getElementsByClassName('wordnum')[0].value) === 0){
                    real_num = 50;
                }      
                else{
                    real_num = Number(document.getElementsByClassName('wordnum')[0].value);
                }

                if(qnum < real_num){ //주어진 단어갯수보다 작아야 됨
                    let total_pv_num = grammar_JSON.length;
                    let random = Math.floor(Math.random()*(total_pv_num))+1;
                    if(document.getElementById('pv_korean').checked){
                        head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                        prob = grammar_JSON[random].eng
                        firstbody.innerHTML = grammar_JSON[random].eng;
                        answertext = grammar_JSON[random].kor;
                        grammar_JSON.splice(random,1);
                        //나머지 3가지 보기를 만듬
                        Temp_JSON = grammar_JSON;
                        let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                        p1text = Temp_JSON[random2].kor;
                        Temp_JSON.splice(random2,1);
                        random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                        p2text = Temp_JSON[random2].kor;
                        Temp_JSON.splice(random2,1);
                        random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                        p3text = Temp_JSON[random2].kor;
                        Temp_JSON.splice(random2,1);
                    }else if(document.getElementById('pv_english').checked){
                        head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                        prob = grammar_JSON[random].kor
                        firstbody.innerHTML = prob;
                        answertext = grammar_JSON[random].eng;
                        grammar_JSON.splice(random,1);
                        //나머지 3가지 보기를 만듬
                        Temp_JSON = grammar_JSON;
                        let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                        p1text = Temp_JSON[random2].eng;
                        Temp_JSON.splice(random2,1);
                        random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                        p2text = Temp_JSON[random2].eng;
                        Temp_JSON.splice(random2,1);
                        random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                        p3text = Temp_JSON[random2].eng;
                        Temp_JSON.splice(random2,1);
                    }else{
                        let ke_random = Math.floor(Math.random()*2);
                        if(ke_random === 0){ //0이면 뜻 맞추기
                            head.innerHTML = qnum+1+"번. 다음 주어진 영어단어의 한글뜻을 선택하세요";
                            prob = grammar_JSON[random].eng;
                            firstbody.innerHTML = grammar_JSON[random].eng;
                            answertext = grammar_JSON[random].kor;
                            grammar_JSON.splice(random,1);
                            //나머지 3가지 보기를 만듬
                            Temp_JSON = grammar_JSON;
                            let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                            p1text = Temp_JSON[random2].kor;
                            Temp_JSON.splice(random2,1);
                            random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                            p2text = Temp_JSON[random2].kor;
                            Temp_JSON.splice(random2,1);
                            random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                            p3text = Temp_JSON[random2].kor;
                            Temp_JSON.splice(random2,1);
                        }else{ // 1이면 영어 맞추기
                            head.innerHTML = qnum+1+"번. 다음 주어진 한글 뜻에 해당되는 영어단어를 선택하세요";
                            prob = grammar_JSON[random].kor;
                            firstbody.innerHTML = grammar_JSON[random].kor;
                            answertext = grammar_JSON[random].eng;
                            grammar_JSON.splice(random,1);                                            
                            //나머지 3가지 보기를 만듬
                            Temp_JSON = grammar_JSON;
                            let random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                            p1text = Temp_JSON[random2].eng;
                            Temp_JSON.splice(random2,1);
                            random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                            p2text = Temp_JSON[random2].eng;
                            Temp_JSON.splice(random2,1);
                            random2 = Math.floor(Math.random()*Temp_JSON.length)+1;
                            p3text = Temp_JSON[random2].eng;
                            Temp_JSON.splice(random2,1);
                        }
                    }
                }

                pvanswer = answerrandom;

                if(answerrandom === 1){
                    secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv5_click(1,'${prob}','${answertext}','${answertext}')"><br>`+
                        `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv5_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                        `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv5_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                        `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv5_click(4,'${prob}','${answertext}','${p3text}')">`;
                }else if(answerrandom === 2){
                    secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv5_click(1,'${prob}','${answertext}','${p1text}')"><br>`+
                        `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv5_click(2,'${prob}','${answertext}','${answertext}')"><br>`+
                        `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv5_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                        `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv5_click(4,'${prob}','${answertext}','${p3text}')">`;
                }else if(answerrandom === 3){
                    secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv5_click(1,'${prob}','${answertext}','${p2text}')"><br>`+
                        `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv5_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                        `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv5_click(3,'${prob}','${answertext}','${answertext}')"><br>`+
                        `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv5_click(4,'${prob}','${answertext}','${p3text}')">`;
                }else{
                    secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p3text}" onclick="pv5_click(1,'${prob}','${answertext}','${p3text}')"><br>`+
                        `<input type="button" id="grammarbutton" value="${p1text}" onclick="pv5_click(2,'${prob}','${answertext}','${p1text}')"><br>`+
                        `<input type="button" id="grammarbutton" value="${p2text}" onclick="pv5_click(3,'${prob}','${answertext}','${p2text}')"><br>`+
                        `<input type="button" id="grammarbutton" value="${answertext}" onclick="pv5_click(4,'${prob}','${answertext}','${answertext}')">`;
                }

                // 완료되면 제출버튼 표시
                if(qnum === real_num){
                    button.innerHTML = '<input type="button" id="bodybutton" onclick="pv5_done()" value="제출">';
                    firstbody.innerHTML = '<div id="pushbutton">아래 제출 버튼을 누르세요.</div>';
                    secondbody.innerHTML = '';
                }
            }
            
            function pv5_done(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                //점수 계산 후 표시
                scores = Math.floor((correct / qnum)*100);
                table = table + 'Power Voca 5 Test 정답률 : ' + scores + "% <hr>";

                result.innerHTML = table;
                button.innerHTML = "";

                total_result.push(["Voca5",scores,answers]);

                pv5done = true;

                //문제가 정해진 갯수만큼 출제되었을때 기본시험인 경우 무조건 PV1으로,..
                //PV1인 경우 그외에는 체점이 70점 상이면 PV2 시험 진행, 아니면 PV1을 선택
                //PV2~PV4인 경우 70점 이상이면 다음 시험 진행, 30점(?)이하이고 아랫단계를 진행하지 않았다면 진행, 그 사이 이면 해당교재선택
                //PV5인 경우 70점 이상이면 PV6으로 추천, 30점(?)이하이고 아랫단계를 진행하지 않았다면 진행, 그 사이 이면 PV5추천
                
                if(scores > 70){
                    voca_choice = "Power Voca 6";

                    if(document.getElementById('middle').checked){                    
                        title.innerText = "중등실력 Test를 시작합니다.";
                        middle_test();
                    } else if(document.getElementById('rtst').checked){                    
                        title.innerText = "한솔플러스영어 교재선택을 위한 Test를 시작합니다.";
                        rtst_test();
                    } else{
                        alert("더 이상 출제된 시험이 없습니다.");
                        button.innerHTML = '<input type="button" id="bodybutton" onclick="printresult()" value="결과보기">';
                        body.innerHTML = '<div id="pushbutton">아래 결과보기 버튼을 누르세요.</div>';
                    }  
                }else if(scores < 30){
                    if(pv4done){
                        voca_choice = "Power Voca 5";
                    }else{
                        pv4_start();
                    }
                }else{
                    voca_choice = "Power Voca 5";

                    if(document.getElementById('middle').checked){                    
                        title.innerText = "중등실력 Test를 시작합니다.";
                        middle_test();
                    } else if(document.getElementById('rtst').checked){                    
                        title.innerText = "한솔플러스영어 교재선택을 위한 Test를 시작합니다.";
                        rtst_test();
                    } else{
                        alert("더 이상 출제된 시험이 없습니다.");
                        button.innerHTML = '<input type="button" id="bodybutton" onclick="printresult()" value="결과보기">';
                        body.innerHTML = '<div id="pushbutton">아래 결과보기 버튼을 누르세요.</div>';
                    }   
                }
            }

            function reading_test(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const result = document.getElementById('result');

                body.innerHTML = '<div id="firstbody"></div><div id="secondbody"></div>';
                button.innerHTML = "";

                console.log("Reading Test 시작 됨.");

                alert("SR Test로 대신하여 진행합니다.");

                rtst_test();
            }

            function middle_test(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const result = document.getElementById('result');

                let aio_str = document.getElementById('grade').value;
                let aio_num = Number(aio_str);

                console.log("중등 Test 시작 됨.");

                body.innerHTML = '<div id="firstbody"></div><div id="secondbody"></div>';
                button.innerHTML = "";

                aio_start(aio_num+1);

                /* if(aio_num === "0"){           
                    aio1_start();
                }else if (aio_num === "1"){        
                    aio2_start();
                }else if (aio_num === "2"){       
                    aio3_start();
                }else if (aio_num === "3"){            
                    aio4_start();
                }else if (aio_num === "4"){              
                    aio5_start();
                }else if (aio_num === "5"){             
                    aio6_start();
                }else{
                    alert("중등 시작 단계가 설정되지 않았습니다.");
                    body.innerHTML =  "";
                }*/      
            }

            function aio_start(aio_num){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;
            
                let p1text;     //보기1문자
                let p2text;     //보기2문자
                let p3text;     //보기3문자
                let p4text;     //보기4문자
                let p5text;     //보기5문자
                
                let openfilestr = "https://yooyoogithub.github.io/HSPELT/data/aio"+aio_num+".xlsx"; //오픈되는 파일명

                phonics3count = 0;

                answers = "";
                qnum = 0;
                correct = 0;

                aio_num_global = aio_num;

                title.innerText = `중등 All In One ${aio_num}의 Level Test를 시작합니다.`;
                
                // test 파일 불러와서 json 파일로 만들기
                let selectedFile = new XMLHttpRequest();
                selectedFile.open("GET", openfilestr); //파일명의 길이도 문제가 되는 것 같음. 짧게 유지
                selectedFile.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
                selectedFile.responseType = "blob"; //Blob형식으로 부탁합니다!
                selectedFile.send();  //위 요청을 보낸다.

                selectedFile.onload = function(){ 

                    if(selectedFile.status === 200){

                        let blob = new Blob([selectedFile.response], {type:'application/xlsx'}); //받은 파일의 내용을 blob 형태로 변환

                        if(blob.size>0){
                            let fileReader = new FileReader();
                            fileReader.readAsBinaryString(blob);                    
                            fileReader.onload = (event)=>{
                                let data = event.target.result;
                                let workbook = XLSX.read(data,{type:"binary"});

                                workbook.SheetNames.forEach(sheet => {
                                    sheet = `aio${aio_num}`;

                                    let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                                    let jsonexcelfile = JSON.stringify(rowObject, undefined, 4);
                                    let jsonexcelfileparse = JSON.parse(jsonexcelfile);

                                    grammar_JSON = JSON.parse(jsonexcelfile);
                                    
                                    if(qnum < grammar_JSON.length){
                                        head.innerHTML = qnum+1+"번. "+grammar_JSON[qnum].head;

                                        firstbody.innerHTML = grammar_JSON[qnum].q;
                                        p1text = grammar_JSON[qnum].a1;
                                        p2text = grammar_JSON[qnum].a2;
                                        p3text = grammar_JSON[qnum].a3;
                                        p4text = grammar_JSON[qnum].a4;
                                        p5text = grammar_JSON[qnum].a5;

                                        pvanswer = grammar_JSON[qnum].answer;

                                        secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p1text}" onclick="aio_click(1)"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p2text}" onclick="aio_click(2)"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p3text}" onclick="aio_click(3)"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p4text}" onclick="aio_click(4)"><br>`+
                                                `<input type="button" id="grammarbutton" value="${p5text}" onclick="aio_click(5)">`;
                                    }
                                });
                            }
                        }
                    }
                }
            }

            function aio_click(useranswer){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                
            
                let p1text;     //보기1문자
                let p2text;     //보기2문자
                let p3text;     //보기3문자
                let p4text;     //보기4문자
                let p5text;     //보기5문자
                
                //정답체크
                if(pvanswer === useranswer){
                    correct ++;
                }

                answers = answers + (qnum+1) + `번.대답(${useranswer})-정답(${pvanswer})/`; 

                if(qnum === 29){
                    scores = Math.floor((correct / (qnum+1))*100);
                    total_result.push(["AIO_"+aio_num_global+"_Voca",scores,answers]);
                    local_correct = correct;
                }else if(qnum === 59){
                    local_correct = (correct - local_correct);
                    scores = Math.floor((local_correct / (qnum-29))*100);
                    total_result.push(["AIO_"+aio_num_global+"_Grammar",scores,answers]);
                    local_correct = correct;
                }else if(qnum === 89){
                    local_correct = (correct - local_correct);
                    scores = Math.floor((local_correct / (qnum-59))*100);
                    total_result.push(["AIO_"+aio_num_global+"_Expression",scores,answers]);
                }else{

                }
                qnum++;
                
                //다음문제작성

                if(qnum < grammar_JSON.length){
                    head.innerHTML = qnum+1+"번. "+grammar_JSON[qnum].head;

                    firstbody.innerHTML = grammar_JSON[qnum].q;
                    p1text = grammar_JSON[qnum].a1;
                    p2text = grammar_JSON[qnum].a2;
                    p3text = grammar_JSON[qnum].a3;
                    p4text = grammar_JSON[qnum].a4;
                    p5text = grammar_JSON[qnum].a5;

                    pvanswer = grammar_JSON[qnum].answer;

                    secondbody.innerHTML = `<input type="button" id="grammarbutton" value="${p1text}" onclick="aio_click(1)"><br>`+
                            `<input type="button" id="grammarbutton" value="${p2text}" onclick="aio_click(2)"><br>`+
                            `<input type="button" id="grammarbutton" value="${p3text}" onclick="aio_click(3)"><br>`+
                            `<input type="button" id="grammarbutton" value="${p4text}" onclick="aio_click(4)"><br>`+
                            `<input type="button" id="grammarbutton" value="${p5text}" onclick="aio_click(5)">`;
                }

                // 완료되면 제출버튼 표시
                if(qnum === grammar_JSON.length){
                    button.innerHTML = '<input type="button" id="bodybutton" onclick="aio_done()" value="제출">';
                    firstbody.innerHTML = '<div id="pushbutton">아래 제출 버튼을 누르세요.</div>';
                    secondbody.innerHTML = '';
                }
            }

            function aio_done(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                let choicemade = false;

                //점수 계산 후 표시
                scores = Math.floor((correct / qnum)*100);
                table = table + '중등 All In One '+aio_num_global+' Test 정답률 : ' + scores + "% <hr>";

                result.innerHTML = table;
                button.innerHTML = "";

                total_result.push(["AIO_"+aio_num_global,scores,answers]);
                pv5done = true;

                //문제가 정해진 갯수만큼 출제되었을때 기본시험인 경우 무조건 PV1으로,..
                //AIO_1인 경우 그외에는 체점이 70점 상이면 AIO_2 시험 진행, 아니면 AIO_1을 선택
                //AIO_2~AIO_5인 경우 70점 이상이면 다음 시험 진행, 30점(?)이하이고 아랫단계를 진행하지 않았다면 진행, 그 사이 이면 해당교재선택
                //AIO_6인 경우 70점 이상이면 AIO_6으로 추천, 30점(?)이하이고 아랫단계를 진행하지 않았다면 진행, 그 사이 이면 AIO_6추천
                
                if(aio_num_global === 1){
                    aio1done = true;
                }else if(aio_num_global === 2){
                    aio2done = true;
                }else if(aio_num_global === 3){
                    aio3done = true;
                }else if(aio_num_global === 4){
                    aio4done = true;
                }else if(aio_num_global === 5){
                    aio5done = true;
                }else{
                    aio6done = true;
                }

                if(aio_num_global === 1){
                    if(scores > 70){
                        if(!aio2done){
                            aio_start(aio_num_global+1);
                        }else{
                            aio_choice = "AIO 2";
                            choicemade = true; 
                        }
                    }else{
                        aio_choice = "AIO 1";
                        choicemade = true;
                    }
                }else if(aio_num_global === 2){
                    if(scores > 70){
                        if(!aio3done){
                            aio_start(aio_num_global+1);
                        }else{
                            aio_choice = "AIO 3";
                            choicemade = true;
                        }
                    }else if(scores < 30){
                        if(!aio1done){
                            aio_start(aio_num_global-1);
                        }else{
                            aio_choice = "AIO 2";
                            choicemade = true;
                        }
                    }else{
                        aio_choice = "AIO 2";
                        choicemade = true;
                    }
                }else if(aio_num_global === 3){
                    if(scores > 70){
                        if(!aio4done){
                            aio_start(aio_num_global+1);
                        }else{
                            aio_choice = "AIO 4";
                            choicemade = true;
                        }
                    }else if(scores < 30){
                        if(!aio2done){
                            aio_start(aio_num_global-1);
                        }else{
                            aio_choice = "AIO 3";
                            choicemade = true;
                        }
                    }else{
                        aio_choice = "AIO 3";
                        choicemade = true;
                    }
                }else if(aio_num_global === 4){
                    if(scores > 70){
                        if(!aio5done){
                            aio_start(aio_num_global+1);
                        }else{
                            aio_choice = "AIO 5";
                            choicemade = true;
                        }
                    }else if(scores < 30){
                        if(!aio3done){
                            aio_start(aio_num_global-1);
                        }else{
                            aio_choice = "AIO 4";
                            choicemade = true;
                        }
                    }else{
                        aio_choice = "AIO 4";
                        choicemade = true;
                    }
                }else if(aio_num_global === 5){
                    if(scores > 70){
                        if(!aio6done){
                            aio_start(aio_num_global+1);
                        }else{
                            aio_choice = "AIO 6";
                            choicemade = true;
                        }
                    }else if(scores < 30){
                        if(!aio4done){
                            aio_start(aio_num_global-1);
                        }else{
                            aio_choice = "AIO 5";
                            choicemade = true;
                        }
                    }else{
                        aio_choice = "AIO 5";
                        choicemade = true;
                    }
                }else{ //aio_num_globa === 6 일경우
                    if(scores > 70){
                            aio_choice = "AIO 6";
                            choicemade = true;
                    }else if(scores < 30){
                        if(!aio5done){
                            aio_start(aio_num_global-1);
                        }else{
                            aio_choice = "AIO 6";
                            choicemade = true;
                        }
                    }else{
                        aio_choice = "AIO 6";
                        choicemade = true;
                    }
                }
                
                if(choicemade){
                    if(document.getElementById('rtst').checked){                    
                        title.innerText = "한솔플러스영어 교재선택을 위한 Test를 시작합니다.";
                        rtst_test();
                    } else{
                        alert("더 이상 출제된 시험이 없습니다.");
                        button.innerHTML = '<input type="button" id="bodybutton" onclick="printresult()" value="결과보기">';
                        body.innerHTML = '<div id="pushbutton">아래 결과보기 버튼을 누르세요.</div>';
                    } 
                }
            }

            function rtst_test(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                // const secondbody = document.getElementById('secondbody');
                // const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let sr_str = document.getElementById('rtstselect').value;
                let sr_num = Number(sr_str);

                console.log("교재선택 Test 시작 됨.");

                body.innerHTML = '<div id="firstbody"></div><div id="secondbody"></div>';
                button.innerHTML = "";

                srt_start(sr_num);
            }

            function srt_start(snum){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                let problem = ""; //문제를 담는 String
            
                let answerabc = "";     //보기를 저장하는 변수
                
                let openfilestr = "https://yooyoogithub.github.io/HSPELT/data/s"+snum+".xlsx"; //오픈되는 파일명

                phonics3count = 0;

                answers = "";
                qnum = 0;
                correct = 0;

                sr_num_global = snum;

                title.innerText = `교재선택 TEST ${snum}의 Level Test를 시작합니다.`;

                let isnotrepeat = true;

                //sr몇 번인지 알아내서 part별 갯수를 저장
                if(snum === 1){
                    srpart1 = 20;
                    srpart2 = 20;
                    srpart3 = 10;
                    srpart4 = 20;
                    srpart5 = 0;
                }else{
                    srpart1 = 20;
                    srpart2 = 15;
                    srpart3 = 10;
                    srpart4 = 20;
                    srpart5 = 20;
                }
                
                // test 파일 불러와서 json 파일로 만들기
                let selectedFile = new XMLHttpRequest();
                selectedFile.open("GET", openfilestr); //파일명의 길이도 문제가 되는 것 같음. 짧게 유지
                selectedFile.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
                selectedFile.responseType = "blob"; //Blob형식으로 부탁합니다!
                selectedFile.send();  //위 요청을 보낸다.

                selectedFile.onload = function(){ 

                    if(selectedFile.status === 200){

                        let blob = new Blob([selectedFile.response], {type:'application/xlsx'}); //받은 파일의 내용을 blob 형태로 변환

                        if(blob.size>0){
                            let fileReader = new FileReader();
                            fileReader.readAsBinaryString(blob);                    
                            fileReader.onload = (event)=>{
                                let data = event.target.result;
                                let workbook = XLSX.read(data,{type:"binary"});

                                workbook.SheetNames.forEach(sheet => {
                                    sheet = `s${snum}`;

                                    let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                                    let jsonexcelfile = JSON.stringify(rowObject, undefined, 4);
                                    let jsonexcelfileparse = JSON.parse(jsonexcelfile);

                                    grammar_JSON = JSON.parse(jsonexcelfile);

                                    if(isnotrepeat){
                                        isnotrepeat = false;
                                        if(qnum < grammar_JSON.length){
                                            //head 출력
                                            head.innerHTML = qnum+1+"번. "+ grammar_JSON[qnum].head;
                                            let p_style = grammar_JSON[qnum].type;

                                            //문제의 type에 따라 문제, 보기를 표시하는 방법이 다름
                                            switch(p_style){
                                                case 1 :
                                                    //모든 case에 공통
                                                    //문단이 주어진 문제는 firstbody에 지문보기 버튼 삽입 후 문제 출제
                                                    if(grammar_JSON[qnum].iswithp){
                                                        problem = `<input type="button" id="para" value="문단보기" onclick="showpara()"><br>`;
                                                    }
                                                    //문제출력
                                                    problem = problem + grammar_JSON[qnum].q;
                                                    firstbody.innerHTML = problem;
                                                    //보기출력
                                                    switch(grammar_JSON[qnum].anum){
                                                        case 3:
                                                            answerabc = answerabc + '<span class="questionimage">1<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a1img+'" width="100px" height="100px" onclick="srt_click(1)"></span>'+
                                                                    '<span class="questionimage">2<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a2img+'" width="100px" height="100px" onclick="srt_click(2)"></span>'+
                                                                    '<span class="questionimage">3<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a3img+'" width="100px" height="100px" onclick="srt_click(3)"></span>';
                                                            break;
                                                        case 4:
                                                        answerabc = answerabc + '<span class="questionimage">1<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a1img+'" width="100px" height="100px" onclick="srt_click(1)"></span>'+
                                                                    '<span class="questionimage">2<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a2img+'" width="100px" height="100px" onclick="srt_click(2)"></span>'+
                                                                    '<span class="questionimage">3<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a3img+'" width="100px" height="100px" onclick="srt_click(3)"></span>'+
                                                                    '<span class="questionimage">4<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a4img+'" width="100px" height="100px" onclick="srt_click(4)"></span>';
                                                            break;
                                                        case 5:
                                                        answerabc = answerabc + '<span class="questionimage">1<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a1img+'" width="100px" height="100px" onclick="srt_click(1)"></span>'+
                                                                    '<span class="questionimage">2<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a2img+'" width="100px" height="100px" onclick="srt_click(2)"></span>'+
                                                                    '<span class="questionimage">3<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a3img+'" width="100px" height="100px" onclick="srt_click(3)"></span><br>'+
                                                                    '<span class="questionimage">4<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a4img+'" width="100px" height="100px" onclick="srt_click(4)"></span>'+
                                                                    '<span class="questionimage">5<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a5img+'" width="100px" height="100px" onclick="srt_click(5)"></span>';
                                                            break;
                                                    }                                               
                                                    secondbody.innerHTML = answerabc;
                                                    //오디오 출력
                                                    myaudio.src = 'resource/s'+ snum + '/' + grammar_JSON[qnum].qmp3;   
                                                    myaudio.play();
                                                    //정답저장
                                                    pvanswer = grammar_JSON[qnum].answer;
                                                    break;                                                
                                                case 2 :
                                                    //모든 case에 공통
                                                    //문단이 주어진 문제는 firstbody에 지문보기 버튼 삽입 후 문제 출제
                                                    if(grammar_JSON[qnum].iswithp){
                                                        problem = `<input type="button" id="para" value="문단보기" onclick="showpara()"><br>`;
                                                    }
                                                    //문제출력
                                                    problem = problem + grammar_JSON[qnum].q;
                                                    firstbody.innerHTML = problem;
                                                    //보기출력
                                                    switch(grammar_JSON[qnum].anum){
                                                        case 3:
                                                            answerabc = answerabc + `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a1}" onclick="srt_click(1)"><br>`+
                                                                                    `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a2}" onclick="srt_click(2)"><br>`+
                                                                                    `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a3}" onclick="srt_click(3)">`;
                                                            break;
                                                        case 4:
                                                        answerabc = answerabc + `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a1}" onclick="srt_click(1)"><br>`+
                                                                                `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a2}" onclick="srt_click(2)"><br>`+
                                                                                `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a3}" onclick="srt_click(3)"><br>`+
                                                                                `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a4}" onclick="srt_click(4)">`;
                                                            break;
                                                        case 5:
                                                        answerabc = answerabc + `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a1}" onclick="srt_click(1)"><br>`+
                                                                                `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a2}" onclick="srt_click(2)"><br>`+
                                                                                `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a3}" onclick="srt_click(3)"><br>`+
                                                                                `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a4}" onclick="srt_click(4)"><br>`+
                                                                                `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a5}" onclick="srt_click(5)">`;
                                                            break;
                                                    }                                               
                                                    secondbody.innerHTML = answerabc;
                                                    //오디오 출력
                                                    myaudio.src = 'resource/s'+ snum + '/' + grammar_JSON[qnum].qmp3;   
                                                    myaudio.play();
                                                    //정답저장
                                                    pvanswer = grammar_JSON[qnum].answer;
                                                    break;
                                                case 3 :
                                                    //모든 case에 공통
                                                    //문단이 주어진 문제는 firstbody에 지문보기 버튼 삽입 후 문제 출제
                                                    if(grammar_JSON[qnum].iswithp){
                                                        problem = `<input type="button" id="para" value="문단보기" onclick="showpara()"><br>`;
                                                    }
                                                    //문제출력
                                                    problem = problem +`<img src="resource/s${snum}/${grammar_JSON[qnum].qimg}" width="200px" height="150px">`;
                                                    firstbody.innerHTML = problem;
                                                    //보기출력
                                                    switch(grammar_JSON[qnum].anum){
                                                        case 3:
                                                            answerabc = answerabc + `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a1}" onclick="srt_click(1)"><br>`+
                                                                                    `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a2}" onclick="srt_click(2)"><br>`+
                                                                                    `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a3}" onclick="srt_click(3)">`;
                                                            break;
                                                        case 4:
                                                        answerabc = answerabc + `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a1}" onclick="srt_click(1)"><br>`+
                                                                                `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a2}" onclick="srt_click(2)"><br>`+
                                                                                `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a3}" onclick="srt_click(3)"><br>`+
                                                                                `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a4}" onclick="srt_click(4)">`;
                                                            break;
                                                        case 5:
                                                        answerabc = answerabc + `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a1}" onclick="srt_click(1)"><br>`+
                                                                                `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a2}" onclick="srt_click(2)"><br>`+
                                                                                `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a3}" onclick="srt_click(3)"><br>`+
                                                                                `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a4}" onclick="srt_click(4)"><br>`+
                                                                                `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a5}" onclick="srt_click(5)">`;
                                                            break;
                                                    }                                               
                                                    secondbody.innerHTML = answerabc;
                                                    //정답저장
                                                    pvanswer = grammar_JSON[qnum].answer;
                                                    break;
                                                case 4 :
                                                    //모든 case에 공통
                                                    //문단이 주어진 문제는 firstbody에 지문보기 버튼 삽입 후 문제 출제
                                                    if(grammar_JSON[qnum].iswithp){
                                                        problem = `<input type="button" id="para" value="문단보기" onclick="showpara()"><br>`;
                                                    }
                                                    //문제출력
                                                    problem = problem +`<img src="resource/s${snum}/${grammar_JSON[qnum].qimg}" width="200px" height="150px">`;
                                                    firstbody.innerHTML = problem;
                                                    //보기출력
                                                    switch(grammar_JSON[qnum].anum){
                                                        case 3:
                                                            answerabc = answerabc + '<br><br><span class="questionimage">1<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a1img+'" width="100px" height="100px" onclick="srt_click(1)"></span>'+
                                                                                    '<span class="questionimage">2<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a2img+'" width="100px" height="100px" onclick="srt_click(2)"></span>'+
                                                                                    '<span class="questionimage">3<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a3img+'" width="100px" height="100px" onclick="srt_click(3)"></span>';
                                                            break;
                                                        case 4:
                                                        answerabc = answerabc + '<br><br><span class="questionimage">1<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a1img+'" width="100px" height="100px" onclick="srt_click(1)"></span>'+
                                                                                    '<span class="questionimage">2<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a2img+'" width="100px" height="100px" onclick="srt_click(2)"></span>'+
                                                                                    '<span class="questionimage">3<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a3img+'" width="100px" height="100px" onclick="srt_click(3)"></span>'+
                                                                                    '<span class="questionimage">4<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a4img+'" width="100px" height="100px" onclick="srt_click(4)"></span>';
                                                            break;
                                                        case 5:
                                                        answerabc = answerabc + '<br><br><span class="questionimage">1<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a1img+'" width="100px" height="100px" onclick="srt_click(1)"></span>'+
                                                                                    '<span class="questionimage">2<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a2img+'" width="100px" height="100px" onclick="srt_click(2)"></span>'+
                                                                                    '<span class="questionimage">3<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a3img+'" width="100px" height="100px" onclick="srt_click(3)"></span>'+
                                                                                    '<span class="questionimage">4<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a4img+'" width="100px" height="100px" onclick="srt_click(4)"></span>'+
                                                                                    '<span class="questionimage">5<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a5img+'" width="100px" height="100px" onclick="srt_click(5)"></span>';
                                                            break;
                                                    }                                               
                                                    secondbody.innerHTML = answerabc;
                                                    //정답저장
                                                    pvanswer = grammar_JSON[qnum].answer;
                                                    break;
                                                case 5 :
                                                    //모든 case에 공통
                                                    //문단이 주어진 문제는 firstbody에 지문보기 버튼 삽입 후 문제 출제
                                                    if(grammar_JSON[qnum].iswithp){
                                                        problem = `<input type="button" id="para" value="문단보기" onclick="showpara()"><br>`;
                                                    }
                                                    //문제출력                            
                                                    firstbody.innerHTML = problem;
                                                    //보기출력
                                                    switch(grammar_JSON[qnum].anum){
                                                        case 3:
                                                            answerabc = answerabc + '<br><br><span class="questionimage">1<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a1img+'" width="100px" height="100px" onclick="srt_click(1)"></span>'+
                                                                                    '<span class="questionimage">2<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a2img+'" width="100px" height="100px" onclick="srt_click(2)"></span>'+
                                                                                    '<span class="questionimage">3<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a3img+'" width="100px" height="100px" onclick="srt_click(3)"></span>';
                                                            break;
                                                        case 4:
                                                        answerabc = answerabc + '<br><br><span class="questionimage">1<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a1img+'" width="100px" height="100px" onclick="srt_click(1)"></span>'+
                                                                                    '<span class="questionimage">2<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a2img+'" width="100px" height="100px" onclick="srt_click(2)"></span>'+
                                                                                    '<span class="questionimage">3<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a3img+'" width="100px" height="100px" onclick="srt_click(3)"></span>'+
                                                                                    '<span class="questionimage">4<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a4img+'" width="100px" height="100px" onclick="srt_click(4)"></span>';
                                                            break;
                                                        case 5:
                                                        answerabc = answerabc + '<br><br><span class="questionimage">1<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a1img+'" width="100px" height="100px" onclick="srt_click(1)"></span>'+
                                                                                    '<span class="questionimage">2<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a2img+'" width="100px" height="100px" onclick="srt_click(2)"></span>'+
                                                                                    '<span class="questionimage">3<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a3img+'" width="100px" height="100px" onclick="srt_click(3)"></span>'+
                                                                                    '<span class="questionimage">4<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a4img+'" width="100px" height="100px" onclick="srt_click(4)"></span>'+
                                                                                    '<span class="questionimage">5<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a5img+'" width="100px" height="100px" onclick="srt_click(5)"></span>';
                                                            break;
                                                    }                                               
                                                    secondbody.innerHTML = answerabc;
                                                    //정답저장
                                                    pvanswer = grammar_JSON[qnum].answer;   
                                                    break;
                                                case 6 :
                                                    //모든 case에 공통
                                                    //문단이 주어진 문제는 firstbody에 지문보기 버튼 삽입 후 문제 출제
                                                    if(grammar_JSON[qnum].iswithp){
                                                        problem = `<input type="button" id="para" value="문단보기" onclick="showpara()"><br>`;
                                                    }
                                                    //문제출력      
                                                    problem = problem + grammar_JSON[qnum].q;                      
                                                    firstbody.innerHTML = problem;
                                                    //보기출력
                                                    switch(grammar_JSON[qnum].anum){
                                                        case 3:
                                                            answerabc = answerabc + `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a1}" onclick="srt_click(1)"><br>`+
                                                                                    `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a2}" onclick="srt_click(2)"><br>`+
                                                                                    `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a3}" onclick="srt_click(3)">`;
                                                            break;
                                                        case 4:
                                                        answerabc = answerabc + `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a1}" onclick="srt_click(1)"><br>`+
                                                                                `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a2}" onclick="srt_click(2)"><br>`+
                                                                                `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a3}" onclick="srt_click(3)"><br>`+
                                                                                `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a4}" onclick="srt_click(4)">`;
                                                            break;
                                                        case 5:
                                                        answerabc = answerabc + `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a1}" onclick="srt_click(1)"><br>`+
                                                                                `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a2}" onclick="srt_click(2)"><br>`+
                                                                                `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a3}" onclick="srt_click(3)"><br>`+
                                                                                `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a4}" onclick="srt_click(4)"><br>`+
                                                                                `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a5}" onclick="srt_click(5)">`;
                                                            break;
                                                    }                                               
                                                    secondbody.innerHTML = answerabc;
                                                    //정답저장
                                                    pvanswer = grammar_JSON[qnum].answer;
                                                    break;
                                            }       
                                        }
                                    }
                                });
                            }
                        }
                    }
                }
            }
            
            function srt_click(useranswer){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                let snum = sr_num_global;
                let problem = ""; //문제를 담는 String
                let answerabc = "";     //보기를 저장하는 변수

                //음성이 있다면 다 멈춤
                myaudio.pause();
                myaudio.currentTime = 0;

                //정답체크
                if(pvanswer === useranswer){
                    correct ++;
                    srpartscore = srpartscore + Number(grammar_JSON[qnum].score);
                }

                answers = answers + (qnum+1) + `번.대답(${useranswer})-정답(${pvanswer})/`; 

                //다음 문제출제
                qnum++;
                if(qnum < grammar_JSON.length){
                    //head 출력
                    head.innerHTML = qnum+1+"번. "+ grammar_JSON[qnum].head;
                    let p_style = grammar_JSON[qnum].type;

                    //문제의 type에 따라 문제, 보기를 표시하는 방법이 다름
                    switch(p_style){
                        case 1 :
                            //모든 case에 공통
                            //문단이 주어진 문제는 firstbody에 지문보기 버튼 삽입 후 문제 출제
                            if(grammar_JSON[qnum].iswithp){
                                problem = `<input type="button" id="para" value="문단보기" onclick="showpara()"><br>`;
                            }
                            //문제출력
                            problem = problem + grammar_JSON[qnum].q;
                            firstbody.innerHTML = problem;
                            //보기출력
                            switch(grammar_JSON[qnum].anum){
                                case 3:
                                    answerabc = answerabc + '<span class="questionimage">1<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a1img+'" width="100px" height="100px" onclick="srt_click(1)"></span>'+
                                            '<span class="questionimage">2<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a2img+'" width="100px" height="100px" onclick="srt_click(2)"></span>'+
                                            '<span class="questionimage">3<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a3img+'" width="100px" height="100px" onclick="srt_click(3)"></span>';
                                    break;
                                case 4:
                                answerabc = answerabc + '<span class="questionimage">1<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a1img+'" width="100px" height="100px" onclick="srt_click(1)"></span>'+
                                            '<span class="questionimage">2<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a2img+'" width="100px" height="100px" onclick="srt_click(2)"></span>'+
                                            '<span class="questionimage">3<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a3img+'" width="100px" height="100px" onclick="srt_click(3)"></span>'+
                                            '<span class="questionimage">4<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a4img+'" width="100px" height="100px" onclick="srt_click(4)"></span>';
                                    break;
                                case 5:
                                answerabc = answerabc + '<span class="questionimage">1<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a1img+'" width="100px" height="100px" onclick="srt_click(1)"></span>'+
                                            '<span class="questionimage">2<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a2img+'" width="100px" height="100px" onclick="srt_click(2)"></span>'+
                                            '<span class="questionimage">3<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a3img+'" width="100px" height="100px" onclick="srt_click(3)"></span><br>'+
                                            '<span class="questionimage">4<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a4img+'" width="100px" height="100px" onclick="srt_click(4)"></span>'+
                                            '<span class="questionimage">5<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a5img+'" width="100px" height="100px" onclick="srt_click(5)"></span>';
                                    break;
                            }                                               
                            secondbody.innerHTML = answerabc;
                            //오디오 출력
                            myaudio.src = 'resource/s'+ snum + '/' + grammar_JSON[qnum].qmp3;   
                            myaudio.play();
                            //정답저장
                            pvanswer = grammar_JSON[qnum].answer;
                            break;                                                
                        case 2 :
                            //모든 case에 공통
                            //문단이 주어진 문제는 firstbody에 지문보기 버튼 삽입 후 문제 출제
                            if(grammar_JSON[qnum].iswithp){
                                problem = `<input type="button" id="para" value="문단보기" onclick="showpara()"><br>`;
                            }
                            //문제출력
                            problem = problem + grammar_JSON[qnum].q;
                            firstbody.innerHTML = problem;
                            //보기출력
                            switch(grammar_JSON[qnum].anum){
                                case 3:
                                    answerabc = answerabc + `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a1}" onclick="srt_click(1)"><br>`+
                                                            `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a2}" onclick="srt_click(2)"><br>`+
                                                            `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a3}" onclick="srt_click(3)">`;
                                    break;
                                case 4:
                                answerabc = answerabc + `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a1}" onclick="srt_click(1)"><br>`+
                                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a2}" onclick="srt_click(2)"><br>`+
                                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a3}" onclick="srt_click(3)"><br>`+
                                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a4}" onclick="srt_click(4)">`;
                                    break;
                                case 5:
                                answerabc = answerabc + `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a1}" onclick="srt_click(1)"><br>`+
                                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a2}" onclick="srt_click(2)"><br>`+
                                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a3}" onclick="srt_click(3)"><br>`+
                                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a4}" onclick="srt_click(4)"><br>`+
                                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a5}" onclick="srt_click(5)">`;
                                    break;
                            }                                               
                            secondbody.innerHTML = answerabc;
                            //오디오 출력
                            myaudio.src = 'resource/s'+ snum + '/' + grammar_JSON[qnum].qmp3;   
                            myaudio.play();
                            //정답저장
                            pvanswer = grammar_JSON[qnum].answer;
                            break;
                        case 3 :
                            //모든 case에 공통
                            //문단이 주어진 문제는 firstbody에 지문보기 버튼 삽입 후 문제 출제
                            if(grammar_JSON[qnum].iswithp){
                                problem = `<input type="button" id="para" value="문단보기" onclick="showpara()"><br>`;
                            }
                            //문제출력
                            problem = problem +`<img src="resource/s${snum}/${grammar_JSON[qnum].qimg}" width="200px" height="150px">`;
                            firstbody.innerHTML = problem;
                            //보기출력
                            switch(grammar_JSON[qnum].anum){
                                case 3:
                                    answerabc = answerabc + `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a1}" onclick="srt_click(1)"><br>`+
                                                            `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a2}" onclick="srt_click(2)"><br>`+
                                                            `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a3}" onclick="srt_click(3)">`;
                                    break;
                                case 4:
                                answerabc = answerabc + `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a1}" onclick="srt_click(1)"><br>`+
                                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a2}" onclick="srt_click(2)"><br>`+
                                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a3}" onclick="srt_click(3)"><br>`+
                                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a4}" onclick="srt_click(4)">`;
                                    break;
                                case 5:
                                answerabc = answerabc + `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a1}" onclick="srt_click(1)"><br>`+
                                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a2}" onclick="srt_click(2)"><br>`+
                                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a3}" onclick="srt_click(3)"><br>`+
                                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a4}" onclick="srt_click(4)"><br>`+
                                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a5}" onclick="srt_click(5)">`;
                                    break;
                            }                                               
                            secondbody.innerHTML = answerabc;
                            //정답저장
                            pvanswer = grammar_JSON[qnum].answer;
                            break;
                        case 4 :
                            //모든 case에 공통
                            //문단이 주어진 문제는 firstbody에 지문보기 버튼 삽입 후 문제 출제
                            if(grammar_JSON[qnum].iswithp){
                                problem = `<input type="button" id="para" value="문단보기" onclick="showpara()"><br>`;
                            }
                            //문제출력
                            problem = problem +`<img src="resource/s${snum}/${grammar_JSON[qnum].qimg}" width="200px" height="150px">`;
                            firstbody.innerHTML = problem;
                            //보기출력
                            switch(grammar_JSON[qnum].anum){
                                case 3:
                                    answerabc = answerabc + '<br><br><span class="questionimage">1<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a1img+'" width="100px" height="100px" onclick="srt_click(1)"></span>'+
                                                            '<span class="questionimage">2<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a2img+'" width="100px" height="100px" onclick="srt_click(2)"></span>'+
                                                            '<span class="questionimage">3<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a3img+'" width="100px" height="100px" onclick="srt_click(3)"></span>';
                                    break;
                                case 4:
                                answerabc = answerabc + '<br><br><span class="questionimage">1<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a1img+'" width="100px" height="100px" onclick="srt_click(1)"></span>'+
                                                            '<span class="questionimage">2<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a2img+'" width="100px" height="100px" onclick="srt_click(2)"></span>'+
                                                            '<span class="questionimage">3<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a3img+'" width="100px" height="100px" onclick="srt_click(3)"></span>'+
                                                            '<span class="questionimage">4<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a4img+'" width="100px" height="100px" onclick="srt_click(4)"></span>';
                                    break;
                                case 5:
                                answerabc = answerabc + '<br><br><span class="questionimage">1<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a1img+'" width="100px" height="100px" onclick="srt_click(1)"></span>'+
                                                            '<span class="questionimage">2<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a2img+'" width="100px" height="100px" onclick="srt_click(2)"></span>'+
                                                            '<span class="questionimage">3<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a3img+'" width="100px" height="100px" onclick="srt_click(3)"></span>'+
                                                            '<span class="questionimage">4<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a4img+'" width="100px" height="100px" onclick="srt_click(4)"></span>'+
                                                            '<span class="questionimage">5<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a5img+'" width="100px" height="100px" onclick="srt_click(5)"></span>';
                                    break;
                            }                                               
                            secondbody.innerHTML = answerabc;
                            //정답저장
                            pvanswer = grammar_JSON[qnum].answer;
                            break;
                        case 5 :
                            //모든 case에 공통
                            //문단이 주어진 문제는 firstbody에 지문보기 버튼 삽입 후 문제 출제
                            if(grammar_JSON[qnum].iswithp){
                                problem = `<input type="button" id="para" value="문단보기" onclick="showpara()"><br>`;
                            }
                            //문제출력                            
                            firstbody.innerHTML = problem;
                            //보기출력
                            switch(grammar_JSON[qnum].anum){
                                case 3:
                                    answerabc = answerabc + '<br><br><span class="questionimage">1<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a1img+'" width="100px" height="100px" onclick="srt_click(1)"></span>'+
                                                            '<span class="questionimage">2<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a2img+'" width="100px" height="100px" onclick="srt_click(2)"></span>'+
                                                            '<span class="questionimage">3<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a3img+'" width="100px" height="100px" onclick="srt_click(3)"></span>';
                                    break;
                                case 4:
                                answerabc = answerabc + '<br><br><span class="questionimage">1<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a1img+'" width="100px" height="100px" onclick="srt_click(1)"></span>'+
                                                            '<span class="questionimage">2<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a2img+'" width="100px" height="100px" onclick="srt_click(2)"></span>'+
                                                            '<span class="questionimage">3<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a3img+'" width="100px" height="100px" onclick="srt_click(3)"></span>'+
                                                            '<span class="questionimage">4<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a4img+'" width="100px" height="100px" onclick="srt_click(4)"></span>';
                                    break;
                                case 5:
                                answerabc = answerabc + '<br><br><span class="questionimage">1<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a1img+'" width="100px" height="100px" onclick="srt_click(1)"></span>'+
                                                            '<span class="questionimage">2<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a2img+'" width="100px" height="100px" onclick="srt_click(2)"></span>'+
                                                            '<span class="questionimage">3<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a3img+'" width="100px" height="100px" onclick="srt_click(3)"></span>'+
                                                            '<span class="questionimage">4<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a4img+'" width="100px" height="100px" onclick="srt_click(4)"></span>'+
                                                            '<span class="questionimage">5<img src="'+'resource/s'+ snum + '/'+grammar_JSON[qnum].a5img+'" width="100px" height="100px" onclick="srt_click(5)"></span>';
                                    break;
                            }                                               
                            secondbody.innerHTML = answerabc;
                            //정답저장
                            pvanswer = grammar_JSON[qnum].answer;
                            break;
                        case 6 :
                            //모든 case에 공통
                            //문단이 주어진 문제는 firstbody에 지문보기 버튼 삽입 후 문제 출제
                            if(grammar_JSON[qnum].iswithp){
                                problem = `<input type="button" id="para" value="문단보기" onclick="showpara()"><br>`;
                            }
                            //문제출력      
                            problem = problem + grammar_JSON[qnum].q;                      
                            firstbody.innerHTML = problem;
                            //보기출력
                            switch(grammar_JSON[qnum].anum){
                                case 3:
                                    answerabc = answerabc + `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a1}" onclick="srt_click(1)"><br>`+
                                                            `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a2}" onclick="srt_click(2)"><br>`+
                                                            `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a3}" onclick="srt_click(3)">`;
                                    break;
                                case 4:
                                answerabc = answerabc + `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a1}" onclick="srt_click(1)"><br>`+
                                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a2}" onclick="srt_click(2)"><br>`+
                                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a3}" onclick="srt_click(3)"><br>`+
                                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a4}" onclick="srt_click(4)">`;
                                    break;
                                case 5:
                                answerabc = answerabc + `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a1}" onclick="srt_click(1)"><br>`+
                                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a2}" onclick="srt_click(2)"><br>`+
                                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a3}" onclick="srt_click(3)"><br>`+
                                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a4}" onclick="srt_click(4)"><br>`+
                                                        `<input type="button" id="grammarbutton" value="${grammar_JSON[qnum].a5}" onclick="srt_click(5)">`;
                                    break;
                            }                                               
                            secondbody.innerHTML = answerabc;
                            //정답저장
                            pvanswer = grammar_JSON[qnum].answer;
                            break;
                    }       
                }

                //part1,2,3,4에 따라 점수를 따로 매겨야 함. part1,2,3,4의 갯수를 저장하는 변수 필요
                if(qnum === (srpart1)){
                    srpart1score = srpartscore;
                    total_result.push(["SR_"+sr_num_global+" part 1",srpart1score,answers]);
                    srpartscore = 0;
                    answers = "";
                }else if(qnum === (srpart1+srpart2)){
                    srpart2score = srpartscore;
                    total_result.push(["SR_"+sr_num_global+" part 2",srpart2score,answers]);
                    srpartscore = 0;
                    answers = "";
                }else if(qnum === (srpart1+srpart2+srpart3)){
                    srpart3score = srpartscore;
                    total_result.push(["SR_"+sr_num_global+" part 3",srpart3score,answers]);
                    srpartscore = 0;
                    answers = "";
                }else if(qnum === (srpart1+srpart2+srpart3+srpart4)){
                    srpart4score = srpartscore;
                    total_result.push(["SR_"+sr_num_global+" part 4",srpart4score,answers]);
                    srpartscore = 0;
                    answers = "";
                }else{
                    if(sr_num_global != 1 ){
                        if(qnum === (srpart1+srpart2+srpart3+srpart4+srpart5)){
                            srpart5score = srpartscore;
                            total_result.push(["SR_"+sr_num_global+" part 5",srpart5score,answers]);
                            srpartscore = 0;
                            answers = "";
                        }
                    }
                }

                // 완료되면 제출버튼 표시
                if(qnum === grammar_JSON.length){
                    button.innerHTML = '<input type="button" id="bodybutton" onclick="srt_done()" value="제출">';
                    firstbody.innerHTML = '<div id="pushbutton">아래 제출 버튼을 누르세요.</div>';
                    secondbody.innerHTML = '';
                }
            }

            function showpara(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const button = document.getElementById('button');
                const result = document.getElementById('result');

                //body 전체를 저장후 para를 보여 줌
                tempbody = body.innerHTML;
                body.innerHTML = `<div id="parag">${grammar_JSON[qnum].p}</div><br><br><input type="button" id="grammarbutton" value="문제로 돌아가기" onclick="backfrompara()">`;
            }

            //문제로 돌아가기 함수
            function backfrompara(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const result = document.getElementById('result');

                body.innerHTML = tempbody;
            }

            function srt_done(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');

                let table = result.innerHTML;

                let choicemade = false;

                //점수 계산 후 표시
                table = table + '교재선택 Test Level '+sr_num_global+'의 part 1 Test 점수 : ' + srpart1score + "점 <hr>";
                table = table + '교재선택 Test Level '+sr_num_global+'의 part 2 Test 점수 : ' + srpart2score + "점 <hr>";
                table = table + '교재선택 Test Level '+sr_num_global+'의 part 3 Test 점수 : ' + srpart3score + "점 <hr>";
                table = table + '교재선택 Test Level '+sr_num_global+'의 part 4 Test 점수 : ' + srpart4score + "점 <hr>";
                if(sr_num_global != 1){
                    table = table + '교재선택 Test Level '+sr_num_global+'의 part 5 Test 점수 : ' + srpart5score + "점 <hr>";
                }else{
                    srpart5score = 0;
                }
                scores = srpart1score + srpart1score + srpart1score + srpart1score + srpart1score;

                result.innerHTML = table;
                button.innerHTML = "";

                if(sr_num_global === 1){
                    aio1done = true;
                }else if(sr_num_global === 2){
                    aio2done = true;
                }else if(sr_num_global === 3){
                    aio3done = true;
                }else{
                    aio4done = true;
                }
                //s1 p1 => 20 p2=> 20 p3=>10 p4=>20 총 70문제 
                /*
                p3와 p4가 평균 70점 이상이면 st1-1추천하고 s2를 시행, 그렇지 않으면
                p1와 p2가 평균 89점 이상이면 Easy Phonics Plus, 그렇지 않으면
                p1와 p2가 평균 75점 이상이면 Easy Phonics, 그렇지 않으면 Phonics Fun 1 추천


                s2~s4 p1=>20 p2=>15 p3=>10 p4=>20 p5=>20 총85문제
                p2 점수 1~5까지 각 4점  => 20
                    6~15까지 각 8점 => 80

                p4가 89점 이상이면 st각 단계 *-5 추천하고 다음 단계 실행
                p4가 84점 이상이면 st각 단계 *-4 추천
                p4가 74점 이상이면 st각 단계 *-3 추천
                p4가 69점 이상이면 st각 단계 *-2 추천
                p4가 69점 미만이면 st각 단계 *-1 추천하고 아랫 단계 실행

                p5가 84점 이상이면 rt각 단계 *-3 추천하고 다음 단계 실행
                p5가 74점 이상이면 rt각 단계 *-2 추천
                p5가 74점 미만이면 rt각 단계 *-1 추천

                다음 단계 trigger p4가 89점 이상 이거나 p5가 84점 이상일 때
                하위 단계 trigger p4가 69점 미만 인 경우 만 
                */
                if(sr_num_global === 1){
                    //Phonics Line 선택
                    if((srpart3score+srpart4score)/2 > 70){
                        if(!aio2done){
                            srt_start(2);
                        }else{
                            story_choice = "Story Town 1-1";
                            phonics_choice = "NONE";
                            reading_choice = "NONE";
                            choicemade = true;
                        }
                    }else if((srpart1score+srpart2score)/2 > 89){
                        story_choice = "NONE";
                        phonics_choice = "Easy Phonics Plus";
                        reading_choice = "NONE";
                        choicemade = true;
                    }else if((srpart1score+srpart2score)/2 > 75){
                        story_choice = "NONE";
                        phonics_choice = "Easy Phonics";
                        reading_choice = "NONE";
                        choicemade = true;
                    }else{
                        story_choice = "NONE";
                        phonics_choice = "Phonics Fun 1";
                        reading_choice = "NONE";
                        choicemade = true;
                    }
                }else{
                    //Reading Town 선택
                    if(srpart5score > 84){
                        if(sr_num_global === 2){
                            if(!aio3done){
                                srt_start(3);
                            }else{
                                reading_choice = "Reading Town 30-3";
                            }
                        }else if(sr_num_global === 3){
                            if(!aio4done){
                                srt_start(4);
                            }else{
                                reading_choice = "Reading Town 50-3";
                            }
                        }else{
                                reading_choice = "Reading Town 70-3";
                        }
                    }else if(srpart5 > 74){
                        if(sr_num_global === 2){
                            reading_choice = "Reading Town 30-2";
                        }else if(sr_num_global === 3){
                            reading_choice = "Reading Town 50-2";
                        }else{
                            reading_choice = "Reading Town 70-2";
                        }
                    }else{
                        if(sr_num_global === 2){
                            reading_choice = "Reading Town 30-1";
                        }else if(sr_num_global === 3){
                            reading_choice = "Reading Town 50-1";
                        }else{
                            reading_choice = "Reading Town 70-1";
                        }
                    }

                    //Story Town 선택
                    if(srpart4score > 89){
                        if(sr_num_global === 2){
                            if(!aio3done){
                                srt_start(3);
                            }else{
                                story_choice = "Story Town 1-5";
                                choicemade = true;
                            }
                        }else if(sr_num_global === 3){
                            if(!aio4done){
                                srt_start(4);
                            }else{
                                story_choice = "Story Town 2-5";
                                choicemade = true;
                            }
                        }else{
                                story_choice = "Story Town 3-5 or Story Town 4-1";
                                choicemade = true;
                        }
                    }else if(srpart4score > 84){
                        if(sr_num_global === 2){
                            story_choice = "Story Town 1-4";
                            choicemade = true;
                        }else if(sr_num_global === 3){
                            story_choice = "Story Town 2-4";
                            choicemade = true;
                        }else{
                            story_choice = "Story Town 3-4";
                            choicemade = true;
                        }
                    }else if(srpart4score > 74){
                        if(sr_num_global === 2){
                            story_choice = "Story Town 1-3";
                            choicemade = true;
                        }else if(sr_num_global === 3){
                            story_choice = "Story Town 2-3";
                            choicemade = true;
                        }else{
                            story_choice = "Story Town 3-3";
                            choicemade = true;
                        }
                    }else if(srpart4score > 69){
                        if(sr_num_global === 2){
                            story_choice = "Story Town 1-2";
                            choicemade = true;
                        }else if(sr_num_global === 3){
                            story_choice = "Story Town 2-2";
                            choicemade = true;
                        }else{
                            story_choice = "Story Town 3-2";
                            choicemade = true;
                        }
                    }else{
                        if(sr_num_global === 2){
                            if(!aio1done){
                                srt_start(1);
                            }else{
                                story_choice = "Story Town 1-1";
                                choicemade = true;
                            }
                        }else if(sr_num_global === 3){
                            if(!aio2done){
                                srt_start(2);
                            }else{
                                story_choice = "Story Town 2-1";
                                choicemade = true;
                            }
                        }else{
                            if(!aio3done){
                                srt_start(3);
                            }else{
                                story_choice = "Story Town 3-1";
                                choicemade = true;
                            }
                        }
                    }
                }

                if(choicemade){
                        alert("모든 시험이 끝났습니다.");
                        button.innerHTML = '<input type="button" id="bodybutton" onclick="printresult()" value="결과보기">';
                        body.innerHTML = '<div id="pushbutton">아래 결과보기 버튼을 누르세요.</div>';
                } 
            }

            function printresult(){
                console.log("Power Voca 선택 : " + voca_choice);
                console.log("중등영어 선택 : " + aio_choice);
                console.log("파닉스 교재 선택 : " + phonics_choice);
                console.log("스토리 타운 선택 : " + story_choice);
                console.log("리딩 타운 선택 : " + reading_choice);

                result.innerHTML = result.innerHTML +   "Power Voca : " + voca_choice + "<br>"+
                                                        "중등영어 : " + aio_choice + "<br>"+
                                                        "파닉스 : " + phonics_choice + "<br>"+
                                                        "Story  Town : " + story_choice + "<br>"+
                                                        "Reading Town: " + reading_choice + "<hr>";

                document.getElementById('button').innerHTML = '<input id="bodybutton" type="button" value="결과보기Print" onclick="printoutresult()">';
                
            }

            let studentname;
            let studentgrade;
            let classname;
            let classphone;
            let testdate;

            function printoutresult(){
                const title = document.getElementById('title');
                const head = document.getElementById('head');
                const body = document.getElementById('body');
                const button = document.getElementById('button');
                const secondbody = document.getElementById('secondbody');
                const firstbody = document.getElementById('firstbody');
                const result = document.getElementById('result');
                const fullscreen = document.getElementById('fullscreen');

                studentname = document.getElementById('studentname').value;
                studentgrade = document.getElementById('studentgrade').value;
                classname = document.getElementById('classname').value;
                classphone = document.getElementById('classphone').value;
                testdate = document.getElementById('testdate').value;

                let buttonprint;

                saveall = fullscreen.innerHTML;
                fullscreen.style.backgroundColor = 'white';
                fullscreen.style.color = 'white';
                fullscreen.style.display = 'block';
                //fullscreen.style.border = 'none';

                let numbering = 1;
                let rtext;
                let tscore;

                /*<span>학생이름</span><input type="text" id="studentname"><br>
                <span>학년</span><input type="text" id="studentgrade"><br>
                <span>학원명</span><input type="text" id="classname"><br>
                <span>학원전화번호</span><input type="text" id="classphone"><br>
                <span>날짜</span><input type="text" id="testdate"><br><hr></hr>
                */

                //reportform 초기화
                reportform = 
                `<div id='resulthtml_base'>
                <br><br><br><br><br>
                    <table align="center" border="1px" cellspacing="1px" cellpadding="3px">
                        <tr>
                            <td>Name</td><td>${studentname} - ${studentgrade}학년</td>
                        </tr>
                        <tr>
                            <td>Date</td><td>${testdate}</td>
                        </tr>
                        <tr>
                            <td>학원명</td><td>${classname}</td>
                        </tr>
                        <tr>
                            <td>Phone</td><td>${classphone}</td>
                        </tr>
                    </table>
                <br><br>`;


                reportform = reportform + `<div id='resulthtml_center'>`;

                //Phonics Test를 봤을 때
                if(total_result.length > 1){
                    let i = 1;
                    if(total_result[i][0] === "대문자순서"){
                        tscore = Number(total_result[i][2]);
                        tscore = tscore + Number(total_result[i+1][2]);
                        tscore = tscore + Number(total_result[i+2][2]);
                        tscore = tscore + Number(total_result[i+3][2]);
                        tscore = tscore + Number(total_result[i+4][2]);

                        if((tscore/5) > 79){
                            rtext = "Alphabet Phonics 교재는 진행할 필요 없음!";
                        }else{
                            rtext = "Alphabet Phonics";
                        }

                        reportform = reportform +
                        `
                        ${numbering}. Alphbet Test Result (추천 : ${rtext})<br>
                            <div id='nextlinealpha1'>
                            <table>
                                <thead>
                                <tr><td>대문자순서 맞추기 점수 ( ${total_result[i][1]} 점 )</td></tr>
                                </thead>
                                <tbody>
                                <tr><td>${total_result[i][2]}</td></tr>
                                </tbody>
                            </table>
                            </div>
                            <hr>

                            <div id='nextlinealpha2'>
                            <table>
                                <thead>
                                <tr><td>소문자순서 맞추기 점수 ( ${total_result[i+1][1]} 점 )</td></tr>
                                </thead>
                                <tbody>
                                <tr><td>${total_result[i+1][2]}</td></tr>
                                </tbody>
                            </table>
                            </div>
                            <hr>

                            <div id='nextlinealpha3'>
                            <table>
                                <thead>
                                <tr><td>대소문자 매칭 점수( ${total_result[i+2][1]} 점 )</td></tr>
                                </thead>
                                <tbody>
                                <tr><td>${total_result[i+2][2]}</td></tr>
                                </tbody>
                            </table>
                            </div>
                            <hr>
                            
                            <div id='nextlinealpha4'>
                            <table>
                                <thead>
                                <tr><td>알파벳 이름 맞추기 점수 ( ${total_result[i+3][1]} 점 )</td></tr>
                                </thead>
                                <tbody>
                                <tr><td>${total_result[i+3][2]}</td></tr>
                                </tbody>
                            </table>
                            </div>
                            <hr>

                            <div id='nextlinealpha5'>
                            <table>
                                <thead>
                                <tr><td>알파벳 소리 맞추기 점수( ${total_result[i+4][1]} 점 )</td></tr>
                                </thead>
                                <tbody>
                                <tr><td>${total_result[i+4][2]}</td></tr>
                                </tbody>
                            </table>
                            </div>
                            <hr>`;
                        i = i + 5;
                        numbering++;
                    }

                    if(total_result.length > i){
                        //Grammar Test 1 의 경우
                        tscore = 0;
                        if(total_result[i][0] === "Grammar 1"){
                            tscore = Number(total_result[i][2]);

                            if(tscore > 79){
                                rtext = "Grammar 1 관련 문법은 진행할 필요 없음!";
                            }else{
                                rtext = "Grammar 1 관련 문법";
                            }
                            reportform = reportform +
                            `<br>
                            ${numbering}. Grammar 1 (추천 : ${rtext})<br>
                                <div id='nextlinealpha1'>
                                <table>
                                    <thead>
                                    <tr><td>Grammar 1 점수 ( ${total_result[i][1]} 점 )</td></tr>
                                    </thead>
                                    <tbody>
                                    <tr><td>${total_result[i][2]}</td></tr>
                                    </tbody>
                                </table>
                                </div>
                                <hr>`;
                            i = i + 1;
                            numbering++;
                        }
                    }

                    if(total_result.length > i){
                        //Grammar Test 2 의 경우
                        tscore = 0;
                        if(total_result[i][0] === "Grammar 2"){
                            tscore = Number(total_result[i][2]);

                            if(tscore > 79){
                                rtext = "Grammar 2 관련 문법은 진행할 필요 없음!";
                            }else{
                                rtext = "Grammar 2 관련 문법";
                            }
                            reportform = reportform +
                            `<br>
                            ${numbering}. Grammar 2 (추천 : ${rtext})<br>
                                <div id='nextlinealpha2'>
                                <table>
                                    <thead>
                                    <tr><td>Grammar 2 점수 ( ${total_result[i][1]} 점 )</td></tr>
                                    </thead>
                                    <tbody>
                                    <tr><td>${total_result[i][2]}</td></tr>
                                    </tbody>
                                </table>
                                </div>
                                <hr>`;
                            i = i + 1;
                            numbering++;
                        }
                    }

                    if(total_result.length > i){
                        //Grammar Test 3 의 경우
                        tscore = 0;
                        if(total_result[i][0] === "Grammar 3"){
                            tscore = Number(total_result[i][2]);

                            if(tscore > 79){
                                rtext = "Grammar 3 관련 문법은 진행할 필요 없음!";
                            }else{
                                rtext = "Grammar 3 관련 문법";
                            }
                            reportform = reportform +
                            `<br>
                            ${numbering}. Grammar 3 (추천 : ${rtext})<br>
                                <div id='nextlinealpha3'>
                                <table>
                                    <thead>
                                    <tr><td>Grammar 3 점수 ( ${total_result[i][1]} 점 )</td></tr>
                                    </thead>
                                    <tbody>
                                    <tr><td>${total_result[i][2]}</td></tr>
                                    </tbody>
                                </table>
                                </div>
                                <hr>`;
                            i = i + 1;
                            numbering++;
                        }
                    }

                    if(total_result.length > i){
                        //Voca Test의 경우
                        if(total_result[i][0][0] === 'V'){
                            reportform = reportform +
                            `<br>
                            ${numbering}. Voca (추천 : ${voca_choice})<br>`;                            
                            for(let checki=0;checki<1;){
                                if(total_result.length > i){
                                    if(total_result[i][0] === 'Voca0'){
                                        reportform = reportform + 
                                        `<div id='nextlinealpha1'>
                                            Voca Basic 점수 ( ${total_result[i][1]} 점 )</div>`;
                                        i++;
                                    }else if(total_result[i][0] === 'Voca1'){
                                        reportform = reportform + 
                                        `<div id='nextlinealpha2'>
                                            Power Voca 1 점수 ( ${total_result[i][1]} 점 )</div>`;
                                        i++;
                                    }else if(total_result[i][0] === 'Voca2'){
                                        reportform = reportform + 
                                        `<div id='nextlinealpha3'>
                                            Power Voca 2 점수 ( ${total_result[i][1]} 점 )</div>`;
                                        i++;
                                    }else if(total_result[i][0] === 'Voca3'){
                                        reportform = reportform + 
                                        `<div id='nextlinealpha4'>
                                            Power Voca 3 점수 ( ${total_result[i][1]} 점 )</div>`;   
                                        i++;
                                    }else if(total_result[i][0] === 'Voca4'){
                                        reportform = reportform + 
                                        `<div id='nextlinealpha1'>
                                            Power Voca 4 점수 ( ${total_result[i][1]} 점 )</div>`;
                                        i++;
                                    }else if(total_result[i][0] === 'Voca5'){
                                        reportform = reportform + 
                                        `<div id='nextlinealpha2'>
                                            Power Voca 5 점수 ( ${total_result[i][1]} 점 )</div>`;
                                        i++;
                                    }else{
                                        checki=1;
                                    }
                                }else{
                                    checki=1;
                                }
                            }
                            numbering++;
                            reportform = reportform + `<hr>`;
                        }
                    }

                    if(total_result.length > i){
                        //중등 All in One Test의 경우
                        if(total_result[i][0][0] === 'A'){
                            reportform = reportform +
                            `<br>
                            ${numbering}. 중등 AIO (추천 : ${aio_choice})<br>`;                            
                            for(let checki=0;checki<1;){
                                if(total_result.length > i){
                                    if(total_result[i][0][4] === '1'){

                                        reportform = reportform + 
                                        `<div id='nextlinealpha1'>
                                            <table>
                                                <thead>
                                                    <tr><td>AIO 1 어휘</td><td>AIO 1 문법</td><td>AIO 1 표현</td></tr>
                                                </thead>
                                                <tbody>
                                                    <tr><td>${total_result[i][1]} 점</td><td>${total_result[i+1][1]} 점</td><td>${total_result[i+2][1]} 점</td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <hr>`;
                                        i = i + 4;
                                    }else if(total_result[i][0][4] === '2'){
                                        reportform = reportform + 
                                        `<div id='nextlinealpha2'>
                                            <table>
                                                <thead>
                                                    <tr><td>AIO 2 어휘</td><td>AIO 2 문법</td><td>AIO 2 표현</td></tr>
                                                </thead>
                                                <tbody>
                                                    <tr><td>${total_result[i][1]} 점</td><td>${total_result[i+1][1]} 점</td><td>${total_result[i+2][1]} 점</td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <hr>`;
                                        i = i + 4;
                                    }else if(total_result[i][0][4] === '3'){
                                        reportform = reportform + 
                                        `<div id='nextlinealpha3'>
                                            <table>
                                                <thead>
                                                    <tr><td>AIO 3 어휘</td><td>AIO 3 문법</td><td>AIO 3 표현</td></tr>
                                                </thead>
                                                <tbody>
                                                    <tr><td>${total_result[i][1]} 점</td><td>${total_result[i+1][1]} 점</td><td>${total_result[i+2][1]} 점</td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <hr>`;
                                        i = i + 4;
                                    }else if(total_result[i][0][4] === '4'){
                                        reportform = reportform + 
                                        `<div id='nextlinealpha4'>
                                            <table>
                                                <thead>
                                                    <tr><td>AIO 4 어휘</td><td>AIO 4 문법</td><td>AIO 4 표현</td></tr>
                                                </thead>
                                                <tbody>
                                                    <tr><td>${total_result[i][1]} 점</td><td>${total_result[i+1][1]} 점</td><td>${total_result[i+2][1]} 점</td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <hr>`;
                                        i = i + 4;
                                    }else if(total_result[i][0][4] === '5'){
                                        reportform = reportform + 
                                        `<div id='nextlinealpha1'>
                                            <table>
                                                <thead>
                                                    <tr><td>AIO 5 어휘</td><td>AIO 5 문법</td><td>AIO 5 표현</td></tr>
                                                </thead>
                                                <tbody>
                                                    <tr><td>${total_result[i][1]} 점</td><td>${total_result[i+1][1]} 점</td><td>${total_result[i+2][1]} 점</td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <hr>`;
                                        i = i + 4;
                                    }else if(total_result[i][0][4] === '6'){
                                        reportform = reportform + 
                                        `<div id='nextlinealpha2'>
                                            <table>
                                                <thead>
                                                    <tr><td>AIO 6 어휘</td><td>AIO 6 문법</td><td>AIO 6 표현</td></tr>
                                                </thead>
                                                <tbody>
                                                    <tr><td>${total_result[i][1]} 점</td><td>${total_result[i+1][1]} 점</td><td>${total_result[i+2][1]} 점</td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <hr>`;
                                        i = i + 4;
                                    }else{
                                        checki=1;
                                    }
                                }else{
                                    checki=1;
                                }
                            }
                            numbering++;
                        }
                    }

                    if(total_result.length > i){
                        //교재선택 Test의 경우
                        if(total_result[i][0][0] === "S"){
                            if(phonics_choice == 'NONE'){
                                reportform = reportform +
                                `<br>
                                ${numbering}. 한솔플러스영어 교재 (Story Town 추천 : ${story_choice} / Reading Town 추천 : ${reading_choice})<br>`;                                                            
                            }else{
                                reportform = reportform +
                                `<br>
                                ${numbering}. 한솔플러스영어 교재 (Phonics 교재 : ${phonics_choice} / Story Town 추천 : ${story_choice} / Reading Town 추천 : ${reading_choice})<br>`;
                            }

                            for(let checki=0;checki<1;){
                                if(total_result.length > i){
                                    if(total_result[i][0][3] === "1"){
                                        reportform = reportform + 
                                        `<div style="color:white;background-color:blue">
                                            ${total_result[i][0][0]}${total_result[i][0][1]} - ${total_result[i][0][3]} Test Result
                                        </div>
                                        <div id='nextlinealpha1'>
                                        
                                            <table align="center" border="1">
                                                <thead>
                                                    <tr><td>Listening</td><td>Phonics</td><td>Grammar</td><td>Reading</td></tr>
                                                </thead>
                                                <tbody>
                                                    <tr><td>${total_result[i][1]} 점</td><td>${total_result[i+1][1]} 점</td><td>${total_result[i+2][1]} 점</td><td>${total_result[i+3][1]} 점</td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <hr>`;
                                        i = i +  4;
                                    }else{
                                        reportform = reportform +
                                        `<div style="color:white;background-color:blue">
                                        ${total_result[i][0][0]}${total_result[i][0][1]} - ${total_result[i][0][3]} Test Result
                                        </div>
                                        <div id='nextlinealpha${total_result[i][0][3]}'>
                                            <table align="center" border="1">
                                                <thead>
                                                    <tr><td>Listening</td><td>Vocabulary</td><td>Grammar</td><td>Language Form</td><td>Reading</td></tr>
                                                </thead>
                                                <tbody>
                                                    <tr><td>${total_result[i][1]} 점</td><td>${total_result[i+1][1]} 점</td><td>${total_result[i+2][1]} 점</td><td>${total_result[i+3][1]} 점</td><td>${total_result[i+4][1]} 점</td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <hr>`;
                                        i = i +  5;
                                    }
                                }else{
                                    checki=1;
                                }
                            }
                            numbering++;
                        }
                        i++;
                    }
                }

                /*reportform = reportform + 
                `</div>
                <div id='resulthtml_bottom'>
                    <div>TOTAL RESULT : ${total_result}</div>
                    <div>Grammar Test Result : ${grammar_result}</div>
                    <div>Power Voca 추천 : ${voca_choice}</div>
                    <div>중등 All In One 추천 : ${aio_choice}</div>
                    <div>Phonics 추천 : ${phonics_choice}</div>
                    <div>Story Town 추천 : ${story_choice}</div>
                    <div>Reading Town 추천 : ${reading_choice}</div>
                </div>`;*/

                reportform = reportform + `</div>`;
                
                buttonprint = `<div><div><input id="resultbutton" type="button" value="print" onclick = "realprint()"></div>`+
                            `<div><input id="resultbutton" type="button" value="다시 돌아가기" onclick="returnfull()"></div></div><br>`;

                fullscreen.innerHTML = buttonprint + reportform;
            }

            function realprint(){
                
                let temphtml;
                
                temphtml = document.getElementById('fullscreen').innerHTML;
                document.getElementById('fullscreen').innerHTML = reportform;
                window.print();
                document.getElementById('fullscreen').innerHTML = temphtml;
            }

            function returnfull(){
                const fullscreen = document.getElementById('fullscreen');

                fullscreen.innerHTML = saveall;
                fullscreen.style.backgroundColor = '#e6e94778';
                fullscreen.style.color = '#b4cc00';
                fullscreen.style.display = 'flex';
            }