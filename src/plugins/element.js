import Vue from 'vue'
import { Button,Input,Form,FormItem,Message,MessageBox,Menu,Submenu,MenuItem,Table,TableColumn,
MenuItemGroup,Breadcrumb,BreadcrumbItem,Dropdown,DropdownMenu,DropdownItem,Tag,Pagination,Upload} from 'element-ui'

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tag);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Upload);

