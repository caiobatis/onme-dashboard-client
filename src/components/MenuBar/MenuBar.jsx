import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import BarChartIcon from '@material-ui/icons/ExitToApp';
import LayersIcon from '@material-ui/icons/Layers';
import Link from '../Link/Link';
import styles from './MenuBar.scss'

export const mainItems = (
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

    <Link
      to="/calculadora"
    >
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Calculadora" />
      </ListItem>
    </Link>
    <Link
      to="/login"
    >
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Sair" />
      </ListItem>
    </Link>
  </div>
)