import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, MapDispatchToProps } from 'react-redux';
import { compose } from 'redux';
import {
    Market,
    marketsFetch,
    RootState,
    selectMarkets,
} from '../../../modules';

interface ReduxProps {
    markets: Market[];
}

interface DispatchProps {
    marketsFetch: typeof marketsFetch;
}

type Props = ReduxProps & DispatchProps & InjectedIntlProps;

class MarketsScreen extends React.Component<Props> {
    public componentDidMount() {
        const { markets } = this.props;

        if (!markets.length) {
            this.props.marketsFetch();
        }
    }

    public render() {
        const { intl, markets } = this.props;

        return (
            <div className="pg-markets-screen">
                <span className="pg-markets-screen__title">
                    {intl.formatMessage({ id: 'page.body.markets.title'}, { marketsCount: markets.length })}
                </span>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    markets: selectMarkets(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    marketsFetch: () => dispatch(marketsFetch()),
});

export const CustomMarketsScreen = compose(
    injectIntl,
    connect(mapStateToProps, mapDispatchToProps),
)(MarketsScreen) as any;
