const { from } = rxjs;
const { filter } = rxjs.operators;
window.onload = function () {
   
    document.getElementById('searchbtn').addEventListener('click', usersData)
}
async function usersData() {

    let result = await fetch('https://jsonplaceholder.typicode.com/users')
    let res = await result.json()
    document.getElementById('col').innerHTML = ""
    document.getElementById('col2').innerHTML = ""

    showUinfo(res)
}
function showUinfo(users) {
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
        importPost.then(x => x.json()).then(data => userPosts(data))

        let row = document.createElement('div');
        row.className = 'row';
        row.innerHTML = user;
        innerdiv.appendChild(row);

    })
}
function userPosts(data){
    
    let innerdiv = document.getElementById('col');
    let head1 = document.createElement('h4')
    head1.innerHTML = 'User Posts'
    head1.className = 'offset-5'
    innerdiv.appendChild(head1)
    from(data).subscribe(data=>{
     let post = `
       <div class="col">
       
       <p class="text-end"><b> ${data.title}</b></p>
       <p class="text-end">${data.body}</p>
       </div>
       
       `;
    let row = document.createElement('div');
    let h1 = document.createElement('h1')
       row.className = 'row';
       row.innerHTML = post;
       let btn2 = document.createElement('button')
       let hr = document.createElement('hr')
       row.appendChild(btn2)
       row.appendChild(h1)
       row.appendChild(hr)
       btn2.onclick = function (){showComments(data.id)}
       btn2.className = "btn btn-warning";
       btn2.innerHTML = " See Comments " ;
       innerdiv.appendChild(row);
    })
}
function showComments(id){
    
    let innerdiv = document.getElementById('col2');
    innerdiv.innerHTML=""
    let head2 = document.createElement('h4')
    head2.innerHTML = 'Post Comments'
    head2.className = 'offset-5'
    innerdiv.appendChild(head2)
    from(fetch('https://jsonplaceholder.typicode.com/comments?postId='+id).then(x=>x.json()))
    .subscribe(comments=>{
     
     comments.forEach(pcomment=>{
       
         let post = `
            <div class="col">
            <p class="text-end"><b>Name: ${pcomment.name}</b></p>
            <p class="text-end"><b>email: ${pcomment.email}</b></p>
            <p class="text-end">Comment: ${pcomment.body}</p>
            </div>
            
            `;
         let row = document.createElement('div');
         let h2 = document.createElement('h2')
         let hr = document.createElement('hr')
            row.className = 'row';
            row.innerHTML = post;
            row.appendChild(h2)
            row.appendChild(hr)
            innerdiv.appendChild(row);
     })
    })
}
