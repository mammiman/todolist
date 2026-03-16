const app = Vue.createApp({
  data() {
    const savedTodos = JSON.parse(localStorage.getItem('myTodos')) || [];
    const maxId = savedTodos.length > 0 ? Math.max(...savedTodos.map(t => t.id)) : 0;

    return {
      newTodo: '',
      todos: savedTodos,
      nextId: maxId + 1,
      searchedTodo: null,
    };
  },
  methods: {
    addTodo() {
      const text = this.newTodo ? this.newTodo.trim(): '';
      if (!text || this.searchTodo) {
        return;
      }
      else {
        this.todos.push({ id: this.nextId, text: this.newTodo, completed: false });
        this.newTodo = '';
        this.nextId++;

      }

    },
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    deleteAll() {
      if (confirm("all data going to remove")) {
        this.todos = [];
        localStorage.clear('myTodo');
      }
    }

  },
  computed: {
    searchTodo() {
      const cleanTodo = this.newTodo.trim().toLowerCase();
      return this.todos.some(item => {
        return item.text && item.text.trim().toLowerCase() === cleanTodo;
      });
    }

  },
  watch: {
    todos: {
      handler(newTodos) {
        localStorage.setItem('myTodos', JSON.stringify(newTodos));
      },
      deep: true
    }

  }
}).mount("#app");