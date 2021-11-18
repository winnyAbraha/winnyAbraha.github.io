const { from } = rxjs;
const { filter } = rxjs.operators;
window.onload = function () {
   
    document.getElementById('searchbtn').addEventListener('click', userFetch)
}
async function userFetch() {

    let result = await fetch('https://jsonplaceholder.typicode.com/users')
    let res = await result.json()
    document.getElementById('col').innerHTML = ""
    document.getElementById('col2').innerHTML = ""

    postEmployees(res)
}
function postEmployees(users) {
    let inputId = +document.getElementById('userinput').value;
   
    from(users).pipe(
        filter(x => x.id == inputId)
    ).subscribe(data => {
       
        let innerdiv = document.getElementById('for');
        innerdiv.innerHTML = "";

        let user = `
           <div style="text-align:center"class="col">
           <p class="text-end"><b>Name: ${data.name}</b></p>
           <p class="text-end">Email: ${data.email}</p>
           <p class="text-end">Address: ${data.address.city +" "+ data.address.street +" "+ data.address.zipcode}</p>
           <p class="text-end">Current Location: ${data.address.geo.lng + ' '+data.address.geo.lat}</p>
           </div>
           
           `;
        let importPost = fetch('https://jsonplaceholder.typicode.com/posts?userId=' + inputId)
        importPost.then(x => x.json()).then(p => showPosts(p))


        let row = document.createElement('div');
        row.className = 'row';
        row.innerHTML = user;
        innerdiv.appendChild(row);

    })
}
function showPosts(p){
    
    let innerdiv = document.getElementById('col');
    let head1 = document.createElement('h4')
    head1.innerHTML = 'POSTS'
    innerdiv.appendChild(head1)
    from(p).subscribe(data=>{
     let post = `
       <div class="col">
       
       <p class="text-end"><b> ${data.title}</b></p>
       <p class="text-end">${data.body}</p>
       </div>
       
       `;
    let row = document.createElement('div');
    let hr = document.createElement('hr')
       row.className = 'row';
       row.innerHTML = post;
       let btn2 = document.createElement('button')
       row.appendChild(btn2)
       row.appendChild(hr)
       btn2.onclick = createDetail
       btn2.className = "btn btn-warning";
       btn2.innerHTML = "Show Comment";
       innerdiv.appendChild(row);
    })
}
function createDetail(){
   
    let inputId = +document.getElementById('userinput').value;
    
    let innerdiv = document.getElementById('col2');
    innerdiv.innerHTML=""
    let head2 = document.createElement('h4')
    head2.innerHTML = 'Comments'
    innerdiv.appendChild(head2)
    from(fetch('https://jsonplaceholder.typicode.com/comments?postId='+inputId).then(x=>x.json()))
    .subscribe(data=>{
     
     data.forEach(com=>{
       
         let post = `
            <div class="col">
            <p class="text-end"><b>Name: ${com.name}</b></p>
            <p class="text-end"><b>email: ${com.email}</b></p>
            <p class="text-end">Comment: ${com.body}</p>
            </div>
            
            `;
         let row = document.createElement('div');
         let hr = document.createElement('hr')
            row.className = 'row';
            row.innerHTML = post;
            row.appendChild(hr)
            innerdiv.appendChild(row);
     })
    })
}
