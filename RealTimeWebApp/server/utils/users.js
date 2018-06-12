
// addUser(id, name, room)
// removeUser(id)
// fetchUser (id)
// getUserList (room)

class Users {
    constructor () {
        this.users = [];
    }
    
    addUser(id, name, room) {
        var user = {id,name,room};
        this.users.push(user);
        return user;        
    }
    
    removeUser(id) {
        var user = this.fetchUser(id);
        
        if(user) {
            this.users = this.users.filter((id) => {
               return user.id != id; 
            });
        }
    }
    
    fetchUser (id) {
       var user = this.users.filter((user)=> {
          return user.id === id; 
       });
        
        return id;
    }
    
    getUserList(room) {
        
        var users = this.users.filter((user)=> {
            return user.room === room;
        });
        
        var namesArray = users.map((user)=> {
           return user.name; 
        });
        
        return namesArray;
    }
}



