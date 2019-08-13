import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LayersIcon from '@material-ui/icons/Layers';
import Link from '../Link/Link';
import styles from './MenuBar.scss'
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const MenuBar = () => {
  
  const [open, setOpen] = React.useState(false);
  const [extrato, setExtrato] = React.useState(false);
  
  function handleClick() {
    setOpen(!open);
  }

  function handleClickExtrato() {
    setExtrato(!extrato);
  }

  return (
    <div className={styles.menuBar}>
      <Link
        to="/"
      >
        <ListItem button>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </Link>

      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Vendas" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={styles.collapse}>
          <Link
            to="/vendas"
          >
            <ListItem button>
              <ListItemText primary="Listar vendas" />
            </ListItem>
          </Link>
          <Link
            to="/vendas/criar"
          >
            <ListItem button>
              <ListItemText primary="Criar vendas" />
            </ListItem>
          </Link>
        </List>
      </Collapse>
      <ListItem button onClick={handleClickExtrato}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Extrato" />
        {extrato ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={extrato} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={styles.collapse}>
          <Link
            to="/extrato/vendas"
          >
            <ListItem button>
              <ListItemText primary="Extrato de vendas" />
            </ListItem>
          </Link>
          <Link
            to="/extrato/custos"
          >
            <ListItem button>
              <ListItemText primary="Extrato de custos" />
            </ListItem>
          </Link>
        </List>
      </Collapse>

      <Link
        to="/calculadora"
      >
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Calculadora" />
        </ListItem>
      </Link>
    </div>
  )
}
export default MenuBar