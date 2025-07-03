import React, { useState } from 'react'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'

const ProfileSection = ({ title, icon, children, editable = false, onSave, className = '' }) => {
  const [isEditing, setIsEditing] = useState(false)
  
  const handleSave = () => {
    onSave?.()
    setIsEditing(false)
  }
  
  const handleCancel = () => {
    setIsEditing(false)
  }
  
  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
            <ApperIcon name={icon} className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        
        {editable && (
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  icon="X"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSave}
                  icon="Check"
                >
                  Save
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                icon="Edit"
              >
                Edit
              </Button>
            )}
          </div>
        )}
      </div>
      
{typeof children === 'function' 
        ? children({ isEditing })
        : React.isValidElement(children) && children.type !== 'div'
        ? React.cloneElement(children, { isEditing })
        : children
      }
    </Card>
  )
}

export default ProfileSection