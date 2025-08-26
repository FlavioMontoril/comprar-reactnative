import { Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import { styles } from './styles'
import { FilterStatus } from '@/types/FilterStatus'
import { useState } from 'react'
import { useProductStore } from '@/store/productsStore'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Filterstatus } from '@/components/Filter'
import { Item } from '@/components/Item'

export function Home() {

  const { products, addProduct, removeProduct, clearProducts, updateStatusProduct } = useProductStore()
  const [status, setStatus] = useState<FilterStatus | null>()
  const [search, setSearch] = useState("")

  const existItem = products.some(item => item.description === search)


  function handleUpdateStatusProduct(id: string) {
    const statusProduct = products.find(item => item.id === id)
    if (status === FilterStatus.DONE) {
      Alert.alert(`Produto: ${statusProduct?.description} adicionado a lista de pendentes`)
      updateStatusProduct(id)
    } else {
      Alert.alert(`Produto: ${statusProduct?.description} adicionado a lista de comprados`)
      updateStatusProduct(id)
    }
  }

  function handleClearProduct() {
    Alert.alert("Limpar!", "Deseja remover todos?", [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => clearProducts() }
    ])
  }

  function handleRemoveProduct(id: string) {
    Alert.alert("Excluir!", "Deseja remover produto?", [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => removeProduct(id) }
    ])
  }

  function handleAdd() {
    if (!search.trim()) {
      return Alert.alert("Informe a descrição para adicionar um item!")
    }
    if (existItem) {
      Alert.alert("Negado!", `item: ${search} já consta na lista.`)
    } else {
      Alert.alert("Adicionado!", `item adicionado: ${search}`)
      addProduct(search)
      setSearch("")
    }
  }

  const filterProducts = products
    .filter((item) => {
      if (status) {
        return item.status === status
      }
      return true
    })
    .filter((item) =>
      item.description.toLocaleLowerCase().trim().includes(search.toLocaleLowerCase().trim()))


  return (
    <View style={styles.container}>
      <Image style={styles.logo}
        source={require('@/assets/logo.png')}
        resizeMode="contain"
      />
      <View style={styles.form}>
        <Input value={search} onChangeText={setSearch} placeholder='O que você precisa comprar ?' />
        <Button title='Adicionar' onPress={handleAdd} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>

          <Filterstatus
            status={FilterStatus.DONE}
            isActive={FilterStatus.DONE === status}
            onPress={() => setStatus(FilterStatus.DONE)}
          />
          <Filterstatus
            status={FilterStatus.PENDING}
            isActive={FilterStatus.PENDING === status}
            onPress={() => setStatus(FilterStatus.PENDING)}

          />
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => handleClearProduct()}
          >
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filterProducts}
          keyExtractor={((item) => item.id)}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={() => handleRemoveProduct(item.id)}
              onStatus={() => handleUpdateStatusProduct(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => (<Text style={styles.empty}>Nenhum Produto encontrado.</Text>)}
        />
      </View>
    </View>
  )
}



