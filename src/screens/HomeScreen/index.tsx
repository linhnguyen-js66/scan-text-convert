import React, { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { Dimensions, FlatList, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import { useTheme } from '@/theme';

import { IconByVariant } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';
import BackgroundApp from '@/components/templates/Background/Background';
import Header from '@/components/templates/Header/Header';
import ItemDocument from '@/components/templates/ItemDocument/ItemDocument';

import SlideItem from './components/slide-item';
import { useStyleHome } from './styles';
import { useHome } from './useHome';

const Component = () => {
  const { colors, fonts, gutters, layout, borders } = useTheme();
  const { t } = useTranslation();
  const { refCarousel } = useHome();
  const styles = useStyleHome();
  const renderEmpty = useCallback(() => {
    return (
      <View style={[layout.itemsCenter, layout.flex_1, layout.justifyCenter]}>
        <IconByVariant height={130} path="ic-file" width={'100%'} />
        <Text
          style={[
            fonts.semibold,
            fonts.size_16,
            gutters.marginTop_24,
            { color: colors.alias_surface },
          ]}
        >
          {t('text.no_data')}
        </Text>
        <Text
          style={[
            fonts.size_12,
            gutters.marginTop_12,
            { color: colors.alias_surface },
          ]}
        >
          {t('text.no_data_des')}
        </Text>
      </View>
    );
  }, []);

  const renderItem = ({ item, index }: { item: unknown; index: number }) => {
    return <ItemDocument item={item} key={index} />;
  };
  const renderCarousel = useCallback(() => {
    return (
      <View
        dataSet={{ kind: 'basis-layouts', name: 'stack' }}
        id="carousel-component"
        style={[gutters.paddingTop_16]}
      >
        <Carousel
          autoPlayInterval={2000}
          customConfig={() => ({ type: 'positive', viewCount: 4 })}
          data={[1,2,3,4]}
          mode={'horizontal-stack'}
          modeConfig={{
            snapDirection: 'left',
            stackInterval: 64,
          }}
          pagingEnabled={true}
          ref={refCarousel}
          renderItem={({ item, index }) => (
            <SlideItem index={index} item={item} key={index} />
          )}
          snapEnabled={true}
          style={styles.item_carousel}
          width={(Dimensions.get('screen').width - 32) * 0.65}
        />
      </View>
    );
  }, []);
  return (
    <SafeScreen backgroundColor={colors.alias_on_surface}>
      <BackgroundApp backgroundColor={colors.alias_on_surface}>
        <Header isBack={false} />
        {/* {renderEmpty()} */}
        {/* <StackLeftCarousel /> */}
        <View style={[gutters.padding_16]}>
          <View style={[gutters.marginBottom_24, { height: 272 }]}>
            <Text style={[fonts.size_16, { color: colors.alias_surface }]}>
              {t('text.recent')}
            </Text>
            {renderCarousel()}
          </View>
          <Text
            style={[
              fonts.size_16,
              { color: colors.alias_surface },
              gutters.marginBottom_16,
            ]}
          >
            {t('text.documents')}
          </Text>
          <FlatList
            data={[1, 2, 3]}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            keyExtractor={(item, index) => index.toString()}
            maxToRenderPerBatch={10}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </BackgroundApp>
    </SafeScreen>
  );
};

const HomeScreen = memo(Component, isEqual);
export default HomeScreen;
