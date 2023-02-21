const keyLocalTaskList = 'k_t_l'
const taskLists = localStorage.getItem(keyLocalTaskList)
  ? JSON.parse(localStorage.getItem(keyLocalTaskList))
  : [];
  let isEditFlag = {
    flag: false,
    indexEdit : -1,
}
  const eleForm = document.querySelector('.main-form');
  const eleName = document.querySelector('.input-name');
  const eleBirthday = document.querySelector('.input-birthday');
  const elePhoneNumber= document.querySelector('.input-phoneNumber');
  const elebtnSubmit = document.querySelector('.btnSubmit');
  const elebtnReset = document.querySelector('.btnReset');
  const eleTable = document.querySelector('.js-result');

  const handleAddTask = ()=>{
    const task = {
        id: new Date().getTime(),
        name: eleName.value,
        birthday: eleBirthday.value,
        phoneNumber: elePhoneNumber.value,
    }

    const demSo = task.phoneNumber.length;//đếm số kí tự trong số điện thoại
    const demChu = task.name.length;//đếm số kí tự trong Name
    const namHienTai = new Date().getFullYear();
    const namSinh = new Date(task.birthday).getFullYear();
    const tuoi = namHienTai - namSinh;

    if(!task.phoneNumber || !task.birthday || !task.name) //Điều kiện phải nhập
    {
      alert('Chưa nhập đủ thông tin')
    }
    else if(demSo != 10) // Điệu kiện phải nhập đủ 10 số
    {
      alert('PhoneNumber: Phải nhập đủ 10 số')
    }
    else if(demChu>15 || demChu<5) //Điều kiện phải nhập tự 5 đén 15 kí tự
    {
      alert('Name: Phải nhập tử 5 đến 15 kí tự')
    }
    else if(tuoi < 18) // Điệu kiện phải đủ 18 tuổi
    {
      alert('Học sinh phải đủ 18 tuối')
    }
    else{
      if(isEditFlag.flag){//Handle edit
        taskLists[isEditFlag.indexEdit] = task,
        isEditFlag = {
            flag: false,
            indexEdit : -1,
        }
      }
      else {
        taskLists.push(task)
      }
      localStorage.setItem(keyLocalTaskList, JSON.stringify(taskLists));
      handleReRenderTaskList();
      eleForm.reset();
    }
    
  }

  const handleResetForm = (event) => {
    event.preventDefault()
    eleForm.reset();
  }
// Sửa
  const handleMakeEditTask = (formdata) =>{
    eleName.value = formdata?.name;
    eleBirthday.value = formdata?.birthday;
    elePhoneNumber.value = formdata?.phoneNumber;
    eleForm.style.display = 'none';
    eleForm.style.display = 'block';
  }
  // Xoá
  const handleDeleteTask = (dataIndex) => {
    const existtedIndex = taskLists.findIndex(taskItem => taskItem.id === dataIndex)
        taskLists.splice(existtedIndex,1)
        localStorage.setItem(keyLocalTaskList,JSON.stringify(taskLists))
        handleReRenderTaskList()
        }

  const handleReRenderTaskList = ()=>{
    let html=''
    taskLists.forEach((task,index) => {
        html += `
        <tr >
            <td>${task?.id}</td>
            <td>${task?.name}</td>
            <td>${task?.birthday}</td>
            <td>${task?.phoneNumber}</td>
            <td>
                <button data-index-Edit=${index}>Edit</button>
                <button class="Delete" data-index=${task.id}>Delete</button>
            </td>
        </tr>`
    });
    eleTable.innerHTML=html;
    // Xoá
    document.querySelectorAll("[data-index]").forEach((elebtn)=>{
      elebtn.addEventListener('click',()=>{
        const dataIndex = Number((elebtn.getAttribute("data-index")))
        handleDeleteTask(dataIndex)
        
    })
  })
    // Sửa
        document.querySelectorAll("[data-index-Edit]").forEach((elebtnEdit)=>{
        elebtnEdit.addEventListener('click',()=>{
        const dataIndex = Number((elebtnEdit.getAttribute("data-index-Edit")))
        isEditFlag = {
          flag:true,
          indexEdit: dataIndex
      }
      const form = taskLists[dataIndex]
      handleMakeEditTask(form)
    })
    })
  }
  function main(){
    handleReRenderTaskList();
    elebtnSubmit.addEventListener('click',(event)=>{
        event.preventDefault();
        handleAddTask();
    })

    elebtnReset.addEventListener('click',handleResetForm)
  }

  main()