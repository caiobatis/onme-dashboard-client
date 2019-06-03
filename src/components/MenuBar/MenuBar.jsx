import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import BarChartIcon from '@material-ui/icons/ExitToApp';
import LayersIcon from '@material-ui/icons/Layers';
import Link from '../Link/Link';

export const mainItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Calculadora" />
    </ListItem>
    <ListItem disabled button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Vendas" />
    </ListItem>

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