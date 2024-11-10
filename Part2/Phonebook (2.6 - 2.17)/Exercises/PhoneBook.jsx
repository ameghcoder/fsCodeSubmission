/* eslint-disable react/prop-types */
import { useState } from "react";
import { useEffect } from "react";
import phonebook from "../Services/phonebook";

const InputField = (props) => {
  return (
    <>
    <div 
      style={{
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          maxWidth: 'fit-content',
          marginBottom: '5px'
      }}>
      <p 
        style={{
          margin: '0px'
      }}>
        {props.title}
      </p>
      <input value={props.value} onChange={props.handleValue} />
    </div>
    </>
  );
}
const Button = (props) => {
  return (
    <button 
      type="button" 
      onClick={props.handler}
      style={{
        display: props.style.display,
        backgroundColor: props.style.bgColor,
        color: props.style.textColor,
        borderRadius: '4px',
        border: 'none',
      }}
    >
      {props.name}
    </button>
  )
}
const ShowUsers = (props) => {
  return (
    <>
      <div 
        style={{
          display: 'flex',
          gap: '4px',
          marginBottom: '4px',
          alignItems: 'center'
        }}
      >
        <strong>
          {props.name}{" | "}
        </strong>
        <em>
          {props.number}{" | "}
        </em>
        <Button 
          name="delete" 
          handler={() => {props.deleteUser(props.id)}}
          style={{
            display: "inline-block",
            bgColor: "red",
            textColor: "white"
          }} 
        />
      </div>
    </>
  )
}
const ShowData = (props) => {
  return (
    <>
      <h2>Numbers</h2>
      <div>
        {props.userData.map((value) => (
          <ShowUsers 
            key={value.id} 
            name={value.name} 
            number={value.number}
            id={value.id}
            deleteUser={props.deleteUser}
          />
        ))}
      </div>
    </>
  );
};
const SearchData = (props) => {
  return (
    <>
      <InputField title="Filter user by name" value={props.value} handleValue={props.function} />
    </>
  );
};
const AddNewUsers = (props) => {
  return (
    <>
      <h2>Add New User</h2>
      <form>
        <InputField title="Name" value={props.newName} handleValue={props.handleName} />
        <InputField title="Number" value={props.newNumber} handleValue={props.handleNumber} />
        <button type="submit" onClick={props.saveUser}>Add User</button>
      </form>
    </>
  );
};
const Notification = ({message, type}) => {
  if(!message){
    return null;
  }

  return (
    <div className={type == 'error' ? 'error-notification' : 'success-notification'}>
      {message}
    </div>
  );
}

// Exercises 2.6
const Phonebook = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState("success");

  // fetch data
  useEffect(() => {
    phonebook
    .getAll()
    .then((resp) => {
        setPersons(resp);
    })
    .catch(() => {
      alert("Something went wrong on Server Side, Reload & Try again")
    })
    ;
  }, []);

  // remove notification after 5 second
  useEffect(() => {
    if(notification !== ""){
      setTimeout(() => {
        setNotification("");
        setNotificationType("");  
      }, 5000);
    }
  }, [notification, notificationType])

  const handleInputName = (e) => {
    setNewName(e.target.value);
  };

  const handleInputNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const filterData = (e) => {
    const search = e.target.value;
    setSearchValue(search);
    setFilteredPersons(
      persons.filter((person) => {
        return person.name.toLowerCase().includes(search.toLowerCase());
      })
    );
  };

  const finalPhonebookData = searchValue == "" ? persons : filteredPersons;

  // Add New User
  const saveUser = (e) => {
    e.preventDefault();
    const newObject = {
      name: newName,
      number: newNumber
    }

    // check newName is exists or not
    const filterArray = persons.filter(person => person.name === newName);
    filterArray.length == 0
    ? 
      phonebook
      .addUser(newObject)
      .then(data => {
        setPersons(persons.concat(data));
        setNotification(`${newName} user added`);
        setNotificationType("success");
        // reset values
        setNewName("");
        setNewNumber("");
      })
      .catch(err => {
        setNotification(`${newName} user not added, Errro: ${err}`);
        setNotificationType("error");
      })
    : (()=>{
      // if user already exists show an alert to the user and asks
      // Name is already added to phonebook, replace the old number with a new one?
      // if user click on Ok then replace the old number, if cancel the do nothing
      
      // update the number in filtered Array
      filterArray[0].number = newNumber;

      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) ? 
      phonebook
      .updateUser(filterArray[0].id, filterArray[0])
      .then(data => {
        setPersons(
          persons.map((person, index) => {
            if(index === filterArray[0].id){
              return data
            } else{
              return person
            }
          })
        )
        // notification
        setNotification(`${newName} user updated`);
        setNotificationType("success");
        
        // reset values
        setNewName("");
        setNewNumber("");
      }).catch(err => {
        setNotification(`${newName} user not updated, Errro: ${err}`);
        setNotificationType("error");
      }) : false;
    })();

  }

  // Delete User
  const deleteUser = (id) => {
    const getUser = persons.find(person => person.id === id);

    window.confirm(`Delete ${getUser.name} ?`)
    ? phonebook
      .deleteUser(id)
      .then(resp => {
        console.log(resp);
        setPersons(
          persons.filter(person => {
            return person.id !== id;
          })
        )
        setNotification(`${getUser.name} user deleted`);
        setNotificationType("success");
      })
      .catch(() => {
        setNotification(`${getUser.name} user not exists or deleted alredy from the server`);
        setNotificationType("error");
      })
    : false ;
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType} />
      <SearchData
        value={searchValue}
        function={filterData}
      />
      <AddNewUsers
        newName={newName}
        newNumber={newNumber}
        handleName={handleInputName}
        handleNumber={handleInputNumber}
        saveUser={saveUser}
      />
      <ShowData 
        userData={finalPhonebookData} 
        deleteUser={deleteUser} 
      />
    </div>
  );
};

export default Phonebook;
