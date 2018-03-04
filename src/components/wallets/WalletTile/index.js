import React from 'react';
import { Icon, Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

import { getWalletColorPair, getWalletIcon } from './variants';
import getBalances from './balances';
import { bigNum } from '../../../utils/numbers';
import s from './styles.css';

const WalletTile = (props) => {
  const {
    name,
    address,
    color,
    icon,

    onClickExport,
    onClickEdit
  } = props;

  const balances = getBalances(props.balances);

  const exportFn = (e) => {
    onClickExport(address);
    e.preventDefault();
    e.stopPropagation();
  };

  const settingsFn = (e) => {
    onClickEdit(address);
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link to={`/wallet/${address}`} className={s.wallet}>
      <div className="pt-card pt-interactive" style={{ backgroundColor: getWalletColorPair(color).bg }}>
        <div className={s.top}>
          <div className={s.pic} style={{ backgroundColor: getWalletColorPair(color).icon }}>
            <Icon iconName={getWalletIcon(icon)}/>
          </div>
          <div className={s.info}>
            <h3>{name}</h3>
            <div className="pt-text-muted">{address}</div>
          </div>
        </div>

        <div className={s.balances}>
          {balances[1] ? <h4>{bigNum(balances[1].value, 2)} {balances[1].symbol}</h4> : null}
          {balances[2] ? <h4>{bigNum(balances[2].value, 2)} {balances[2].symbol}</h4> : null}
          {balances[3] ? <h4>{bigNum(balances[3].value, 2)} {balances[3].symbol}</h4> : null}
          {balances[4] ? <h4>{bigNum(balances[4].value, 2)} {balances[4].symbol}</h4> : null}
          {balances.moreLen
            ? <h6>{balances.moreLen} more assets</h6>
            : null}
        </div>

        <div className={s.control}>
          <Button type="button" className="pt-minimal" iconName="export" onClick={exportFn}/>
          <Button type="button" className="pt-minimal" iconName="cog" onClick={settingsFn}/>
        </div>
      </div>
    </Link>
  );
};

export default WalletTile;